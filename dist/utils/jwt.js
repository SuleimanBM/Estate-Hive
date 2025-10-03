// utils/jwt.ts
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '30d';
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error('JWT secrets must be defined in environment variables');
}
export function signAccessToken(payload) {
    const expiresIn = "1h";
    // FIX: Initialize options as an empty object and conditionally assign properties.
    // This avoids the type conflict caused by the conditional spread operator.
    const options = {};
    if (expiresIn) {
        options.expiresIn = expiresIn;
    }
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, options);
}
/**
 * Signs a new Refresh Token. ExpiresIn is only included if the value is defined.
 * @param payload The JWT claims payload.
 * @returns The signed JWT string.
 */
export function signRefreshToken(payload) {
    const expiresIn = "1h";
    // FIX: Initialize options as an empty object and conditionally assign properties.
    const options = {};
    if (expiresIn) {
        options.expiresIn = expiresIn;
    }
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, options);
}
export function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
export function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        return {
            valid: true,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
//# sourceMappingURL=jwt.js.map