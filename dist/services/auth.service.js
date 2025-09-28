import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePasswords } from '../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
const prisma = new PrismaClient();
export async function registerService({ name, email, password, phone }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error('Email already in use');
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { name, email, password: hashed, phone, role: 'TENANT' },
    });
    // TODO: enqueue verification email
    return user;
}
export async function loginService({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('Invalid credentials');
    const isValid = await comparePasswords(password, user.password);
    if (!isValid)
        throw new Error('Invalid credentials');
    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id });
    // Store refresh token in DB for revocation / rotation
    await prisma.refreshToken.create({
        data: { userId: user.id, token: refreshToken, revoked: false, expiresAt: null },
    });
    return { user, accessToken, refreshToken };
}
export async function reIssueAccessToken({ refreshToken }) {
    let payload;
    try {
        payload = verifyRefreshToken(refreshToken);
    }
    catch (err) {
        throw new Error('Invalid refresh token');
    }
    return "accesstoken";
}
export async function logoutService(refreshToken) { }
//# sourceMappingURL=auth.service.js.map