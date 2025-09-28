import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        role: string;
        id: string;
      };
    }
  }
}

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdminRoute = req.originalUrl.startsWith('/admin');
    const cookieName = isAdminRoute ? 'adminJwtToken' : 'jwtToken';

    // Sets cookie based on who logs in admin/user
    const cookie = req.cookies?.[cookieName];
    const authHeader = req.headers?.authorization;
    // Access token is taken from either the cookies or authorization header
    const accessToken = cookie || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

    if (!accessToken) {
      return res.status(401).json({ success: false, message: 'Unauthorized. No token found' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: 'JWT secret not configured' });
    }

    // Verifying access token
    const jwtUser = jwt.verify(accessToken, process.env.JWT_SECRET) as JwtPayload;

    if (!jwtUser || !jwtUser.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token payload' });
    }

    //req.user = { id: jwtUser.id };
    next();

  } catch (error: any) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token has expired' });
    }
    return res.status(500).json({ success: false, message: 'Internal Server Error during authentication' });
  }
};
