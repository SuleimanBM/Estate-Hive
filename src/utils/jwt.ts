// utils/jwt.ts
import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
    id: string;
}

export interface VerifyJwtResult {
    valid: boolean;
    expired: boolean;
    decoded: JwtPayload | null;
}

export function signJwt(userId: string): string {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export function verifyJwt(token: string): VerifyJwtResult {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        };
    }
}



const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '30d';

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error('JWT secrets must be defined in environment variables');
}

export function signAccessToken(payload: object): string {
    const expiresIn = "15m";

    // FIX: Initialize options as an empty object and conditionally assign properties.
    // This avoids the type conflict caused by the conditional spread operator.
    const options: SignOptions = {};

    if (expiresIn) {
        options.expiresIn = expiresIn ;
    }

    return jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET as jwt.Secret,
        options
    );
}

/**
 * Signs a new Refresh Token. ExpiresIn is only included if the value is defined.
 * @param payload The JWT claims payload.
 * @returns The signed JWT string.
 */
export function signRefreshToken(payload: object): string {
    const expiresIn = "1h"
    // FIX: Initialize options as an empty object and conditionally assign properties.
    const options: SignOptions = {};

    if (expiresIn) {
        options.expiresIn = expiresIn;
    }

    return jwt.sign(
        payload,
        REFRESH_TOKEN_SECRET as jwt.Secret,
        options
    );
}

export function verifyAccessToken(token: string) {
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as jwt.Secret);
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        }
    }
    }

export function verifyRefreshToken(token: string) {
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as jwt.Secret);
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (e: any) {
        return {
            valid: true,
            expired: e.message === "jwt expired",
            decoded: null,
        }
    }
}