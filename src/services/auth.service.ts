import { PrismaClient, Prisma } from '@prisma/client';
import { hashPassword, comparePasswords } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { stringify } from 'querystring';
import { sendEmail } from 'utils/email.js';
import {generateVerificationToken, verifyVerificationToken} from 'utils/verificationToken.js';
import { hmacProcess } from 'utils/hmac.js';


const prisma = new PrismaClient();


export async function registerService({ name, email, password, phone }: { name: string; email: string; password: string; phone: string }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('Email already in use');


    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { name, email, password: hashed, phone, role: 'TENANT' },
    });

    const token = await generateVerificationToken(user.id);
    const subject = 'Verify Your Email Address';
    const message = `Please verify your email by clicking the following link: ${process.env.APP_URL}/verify-email?token=${token}`;
    const html = `
  <div>
    <h2>Email Verification</h2>
    <p>Please verify your email address by clicking the button below:</p>
    <a href="${process.env.APP_URL}/verify-email?token=${token}" 
       style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
       Verify Email
    </a>
    <p>Or copy and paste this link in your browser:</p>
    <p>${process.env.APP_URL}/verify-email?token=${token}</p>
  </div>
`;

    await sendEmail(user.email, subject, message, html);

    return user;
}

export async function verifyEmail(token: string) {
        try {
            const decoded = await verifyVerificationToken(token) as {
                userId: string;
                type: string;
            };;

            if (decoded.type !== "emailVerification") {
                throw new Error("Invalid token type");
            }

            const user = await prisma.user.findUnique({where:{id: decoded.userId}});
            if (!user) throw new Error("User not found");

            if (user.isVerified) {
                return { alreadyVerified: true };
            }

            await prisma.user.update({
                where:{id: decoded.userId},
                data: {isVerified: true},
            })

            return { success: true };
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
    }

export async function loginService({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');


    const isValid = await comparePasswords(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');


    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id });


    // Store refresh token in DB for revocation / rotation
    await prisma.refreshToken.create({
        data: { userId: user.id, token: refreshToken, revoked: false, expiresAt: null },
    });


    return { user, accessToken, refreshToken };
}


export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    let payload: any
    // 1. Validate the incoming Refresh Token
    try {
        payload = verifyRefreshToken(refreshToken);
    } catch (err) {
        // If the token is invalid or expired, throw an error
        throw new Error('Invalid or expired refresh token');
    }

    //invalidateRefreshToken(refreshToken);
    await prisma.refreshToken.update({
        where: {
            token: refreshToken
        } as Prisma.RefreshTokenWhereUniqueInput,
        data: { revoked: true, expiresAt: null },
    });

    // 3. Generate a brand new Access Token
    const newAccessToken = signAccessToken(payload);

    // 4. Generate a brand new Refresh Token
    const newRefreshToken = signRefreshToken(payload);

    // 5. Return both new tokens
    return {
        newAccessToken,
        newRefreshToken
    };
}

export async function logoutService(refreshToken: any) { 
    await prisma.refreshToken.delete({
        where: {
            token: refreshToken,
        } as Prisma.RefreshTokenWhereUniqueInput,
    });
}

export async function generateResetCode(email: string) {
    const existingUser = await prisma.user.findUnique({where: {email} });
    if (!existingUser) {
        throw new Error("User not found");
    }

    const resetTokenCode = Math.floor(100000 + Math.random() * 900000)
        .toString()
        .padStart(6, "0");
    
    const htmlContent = `
    <p>Dear ${existingUser.name},</p>
    <p>We received a request to reset your password. Your reset code is:
    <strong>${resetTokenCode}</strong></p>
    <p>This code is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
    <p>Thank you,<br>estateHuve</p>
  `;
    
    const info = await sendEmail(existingUser.email, "Password Reset code", " " , htmlContent)


    if (info.response && info.response.includes("OK")) {
        const hashedCode = hmacProcess(resetTokenCode, process.env.HMAC_SECRET_CODE!);
        // existingUser.resetTokenCode = hashedCode;
        // existingUser.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
        // await existingUser.save();
    }

    return true;
}


export async function resetPassword(email: string, resetTokenCode: string, newPassword: string) {
    const existingUser = await prisma.user.findUnique({where: {email} }).select("+resetTokenCode +resetTokenExpiry");
    if (!existingUser) {
        throw new Error("User not found");
    }

    if (!existingUser.resetTokenCode || !existingUser.resetTokenExpiry) {
        throw new Error("Invalid or expired reset code");
    }

    if (Date.now() > existingUser.resetTokenExpiry.getTime()) {
        throw new Error("Reset code has expired. Please request a new one.");
    }

    const hashedCode = hmacProcess(resetTokenCode, process.env.HMAC_SECRET_CODE!);
    if (hashedCode !== existingUser.resetTokenCode) {
        throw new Error("Invalid reset code");
    }

    existingUser.password = await hashPassword(newPassword);
    existingUser.resetTokenCode = undefined;
    existingUser.resetTokenExpiry = undefined;
    await existingUser.save();

    return true;
}
