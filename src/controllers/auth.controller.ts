import { Request, Response } from "express";

import * as authService from '../services/auth.service.js';
import { access } from "fs";


export async function registerHandler(req: Request, res: Response) {
    try {
        const { user, accessToken, refreshToken } = await authService.registerService(req.body);

        return res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken });

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

        const {accessToken,refreshToken} = await authService.verifyEmail(token);

        return res.status(200).json({
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

        return res.json({
            user: { id: user.id, email: user.email, name: user.name },
            accessToken,
            refreshToken
        });
    } catch (err: any) {
        return res.status(401).json({ error: err.message });
    }
}

export async function refreshHandler(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body;
        const {newAccessToken, newRefreshToken} = await authService.reIssueAccessToken({ refreshToken });
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (err: any) {
        return res.status(401).json({ error: err.message });
    }
}

export async function logoutHandler(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body;

        await authService.logoutService(refreshToken);

        return res.status(200).json({ accessToken: null });
        
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await authService.generateResetCode(email);

        return res.status(204).json({
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

        return res.status(204).json({
            message: "Password reset successfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || "Error resetting password"
        });
    }
};

export async function getProfileHandler(req: Request, res: Response) {
    try {
        const userId = req.user?.id

        const user = await authService.getUserProfile(userId);

        return res.status(200).json({ user })
        
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || "Error getting user profile"
        });
    }
}

export async function updateProfileHandler(req: Request, res: Response) {
    try {
        const userId = req.user?.id

        const updateInfo = req.body

        const updatedUser = await authService.updateUserProfle(userId, updateInfo)

        return res.status(200).json({ updatedUser })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Error updating user profile"
        });
    }
}

export async function deleteUserProfileHandler(req: Request, res: Response) {
    try {
        const userId = req.user?.id

        await authService.deleteUserProfile(userId)

        return res.status(204).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Error deleting user profile"
        });
    }
}