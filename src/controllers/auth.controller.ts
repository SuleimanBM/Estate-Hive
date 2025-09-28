import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { hmacProcess } from "../middleware/hmac.js";
import transporter from "../middleware/send.mail";

import * as authService from '../services/auth.service.js';


export async function registerHandler(req: Request, res: Response) {
    try {
        const user = await authService.registerService(req.body);

        return res.status(201).json({ user: { id: user.id, email: user.email, name: user.name } });

    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}

export async function verifyEmailHandler(req: Request, res: Response) {
    try {
        const { token } = req.params; // token from query param ?token=<token>

        if (!token || typeof token !== "string") {
            return res.status(400).json({
                success: false,
                message: "Token is required"
            });
        }

        await authService.verifyEmail(token);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || "Email verification failed"
        });
    }
}

export async function loginHandler(req: Request, res: Response) {
    try {

        const { user, accessToken, refreshToken } = await authService.loginService(req.body);

        return res.json({ user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken });
    } catch (err: any) {
        return res.status(401).json({ error: err.message });
    }
}

export async function refreshHandler(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.reIssueAccessToken({ refreshToken });
        return res.json(tokens);
    } catch (err: any) {
        return res.status(401).json({ error: err.message });
    }
}

export async function logoutHandler(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body;
        await authService.logoutService({ refreshToken });
        return res.status(200).json({ success: true });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await authService.generateResetCode(email);

        return res.status(200).json({
            success: true,
            message: "Reset code sent successfully"
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error sending reset code"
        });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, resetTokenCode, newPassword } = req.body;
        await authService.resetPassword(email, resetTokenCode, newPassword);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error resetting password"
        });
    }
};


interface CreateHandlerRequest extends Request {
    body: {
        firstname: string;
        middlename?: string;
        lastname: string;
        email: string;
        password: string;
    };
}

interface LoginHandlerRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

interface ForgotPasswordRequest extends Request {
    body: {
        email: string;
    };
}

interface VerifyResetCodeRequest extends Request {
    body: {
        email: string;
        resetTokenCode: string;
        newPassword: string;
    };
}

// export const createHandler = async (req: CreateHandlerRequest, res: Response) => {
//     try {
//         const { user, token } = await createUser(req.body);

//         return res.status(201).json({
//             success: true,
//             message: "User created successfully",
//             accessToken: token,
//             data: user,
//         });
//     } catch (error: any) {
//         console.error("Error creating user:", error);

//         return res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.message || "Internal server error",
//         });
//     }
// };

// export const loginUserHandler = async (req: LoginHandlerRequest, res: Response) => {
//     const { email, password } = req.body;

//     try {
//         const { token, user } = await loginUser(email, password);

//         res.cookie("jwtToken", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 24 * 60 * 60 * 1000,
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Login successful",
//             accessToken: token,
//             data: user,
//         });
//     } catch (error: any) {
//         console.error("Error logging in user:", error);
//         return res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.message || "Internal server error",
//         });
//     }
// };

// export const logoutUserHandler = (req: Request, res: Response) => {
//     try {
//         res.clearCookie("jwtToken", {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//         });
//         return res.status(200).json({
//             success: true,
//             message: "Logout successful",
//             accessToken: null
//         });
//     } catch (error) {
//         console.error("Error logging out User:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };

// export const forgotPasswordCodeGeneration = async (req: ForgotPasswordRequest, res: Response) => {
//     const { email } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         const userFirstname = existingUser.firstname;

//         let resetTokenCode = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
//         const htmlContent = `
//       <p>Dear ${userFirstname},</p>
//       <p>We received a request to reset your password. Your reset code is: <strong>${resetTokenCode}</strong></p>
//       <p>This code is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
//       <p>Thank you,<br>estateHuve</p>
//     `;

//         let info = await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: existingUser.email,
//             subject: "🔐 Password Reset Code",
//             html: htmlContent
//         });

//         if (info.response && info.response.includes("OK")) {
//             const hashedCode = hmacProcess(resetTokenCode, process.env.HMAC_SECRET_CODE!);
//             existingUser.resetTokenCode = hashedCode;
//             existingUser.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
//             await existingUser.save();

//             return res.status(200).json({
//                 success: true,
//                 message: "Reset code sent successfully"
//             });
//         }
//     } catch (error) {
//         console.error("Error sending reset code:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };

// export const verifyResetCode = async (req: VerifyResetCodeRequest, res: Response) => {
//     const { email, resetTokenCode, newPassword } = req.body;
//     try {
//         const existingUser = await User.findOne({ email }).select('resetTokenCode resetTokenExpiry');
//         if (!existingUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         if (!existingUser.resetTokenCode) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid reset code request. Please request a new reset code."
//             });
//         }

//         if (Date.now() > (existingUser.resetTokenExpiry?.getTime() || 0)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Reset code has expired. Please request a new reset code."
//             });
//         }

//         const hashedCode = hmacProcess(resetTokenCode, process.env.HMAC_SECRET_CODE!);
//         if (hashedCode === existingUser.resetTokenCode && Date.now() <= (existingUser.resetTokenExpiry?.getTime() || 0)) {
//             existingUser.resetTokenCode = undefined;
//             existingUser.resetTokenExpiry = undefined;
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         existingUser.password = hashedPassword;
//         await existingUser.save();

//         return res.status(200).json({
//             success: true,
//             message: "Password reset successfully"
//         });
//     } catch (error) {
//         console.error("Error verifying reset code:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };