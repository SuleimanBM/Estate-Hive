import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { PrismaClient, Role } from '@prisma/client';
import { reIssueAccessToken } from "../services/auth.service.js"


const prisma = new PrismaClient();


export async function requireAuth(req: Request, res: Response, next: NextFunction) {

    //console.log(req.headers.authorization)

    const authHeader = req.headers.authorization || '';
    const accessToken = authHeader.replace(/^Bearer\s/, '');
    const refreshToken = req.headers['x-refresh'] as string;

    if (!accessToken) {
        return next();
    }

    const result = verifyAccessToken(accessToken);

    if (result.valid && result.decoded) {
       // console.log("result is valid and results decoded is ", result.decoded)
        // Type guard to ensure decoded is an object with sub property
        if (typeof result.decoded === 'object' && result.decoded !== null && 'sub' in result.decoded) {
            const user = await prisma.user.findUnique({
                where: { id: (result.decoded as { sub: string }).sub }
            });

            if (user) {
                req.user = user;
            }
            return next();
        }
    }

    if (result.expired && refreshToken) {
        //console.log("result is expired")

        try {
            const {newAccessToken,newRefreshToken} = await reIssueAccessToken({ refreshToken });

            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken);

                res.setHeader('x-refresh-token', newRefreshToken);

                const newResult = verifyAccessToken(newAccessToken);

                if (newResult.valid && newResult.decoded &&
                    typeof newResult.decoded === 'object' &&
                    'sub' in newResult.decoded) {

                    const user = await prisma.user.findUnique({
                        where: { id: (newResult.decoded as { sub: string }).sub }
                    });

                    if (user) {
                        req.user = user;
                    }
                    return next()
                }
            }
            return next()
        } catch (error) {
            console.error('Token refresh error:', error);
        }
    }

    return next()
}

// export const requireRole = (...allowed: Role[]) => (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
//     if (allowed.includes(req.user.role)) return next();
//     return res.status(403).json({ error: 'Forbidden' });
// };

function isRole(role: any): role is Role {
    return Object.values(Role).includes(role);
}

export const requireRole =
    (...allowed: Array<"SUPERADMIN" | "ADMIN" | "MANAGER" | "TENANT">) =>
        (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) return res.status(401).json({ error: "Unauthenticated" });
            if (isRole(req.user.role) && allowed.includes(req.user.role)) return next();
            return res.status(403).json({ error: "Forbidden" });
};