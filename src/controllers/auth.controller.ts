import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
//import { hmacProcess } from "../middleware/hmac.js";
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
        const token = req.query.token; // token from query param ?token=<token>

        if (!token || typeof token !== "string") {
            return res.status(400).json({
                success: false,
                message: "Token is required"
            });
        }

        const {success,accessToken,refreshToken} = await authService.verifyEmail(token);

        return res.status(200).json({
            success,
            message: "Email verified successfully",
            accessToken,
            refreshToken
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
        await authService.logoutService(refreshToken);
        return res.status(200).json({ success: true, accessToken: null });
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
