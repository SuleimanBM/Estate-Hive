import { verifyAccessToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';
import { reIssueAccessToken } from "../services/auth.service";
const prisma = new PrismaClient();
export async function authMiddleware(req, res, next) {
    // Get tokens from headers without lodash
    const authHeader = req.headers.authorization || '';
    const accessToken = authHeader.replace(/^Bearer\s/, '');
    const refreshToken = req.headers['x-refresh'];
    if (!accessToken) {
        return next();
    }
    const result = verifyAccessToken(accessToken);
    if (result.valid && result.decoded) {
        // Type guard to ensure decoded is an object with sub property
        if (typeof result.decoded === 'object' && result.decoded !== null && 'sub' in result.decoded) {
            const user = await prisma.user.findUnique({
                where: { id: result.decoded.sub }
            });
            if (user) {
                req.user = user;
            }
            return next();
        }
    }
    if (result.expired && refreshToken) {
        try {
            const newAccessToken = await reIssueAccessToken({ refreshToken });
            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken);
                const newResult = verifyAccessToken(newAccessToken);
                if (newResult.valid && newResult.decoded &&
                    typeof newResult.decoded === 'object' &&
                    'sub' in newResult.decoded) {
                    const user = await prisma.user.findUnique({
                        where: { id: newResult.decoded.sub }
                    });
                    if (user) {
                        req.user = user;
                    }
                }
            }
        }
        catch (error) {
            console.error('Token refresh error:', error);
        }
    }
}
export const requireRole = (...allowed) => (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ error: 'Unauthenticated' });
    if (allowed.includes(req.user.role))
        return next();
    return res.status(403).json({ error: 'Forbidden' });
};
//# sourceMappingURL=auth.middleware.js.map