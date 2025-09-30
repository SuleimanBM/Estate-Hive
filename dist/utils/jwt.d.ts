import jwt from "jsonwebtoken";
export interface JwtPayload {
    id: string;
}
export interface VerifyJwtResult {
    valid: boolean;
    expired: boolean;
    decoded: JwtPayload | null;
}
export declare function signJwt(userId: string): string;
export declare function verifyJwt(token: string): VerifyJwtResult;
export declare function signAccessToken(payload: object): string;
/**
 * Signs a new Refresh Token. ExpiresIn is only included if the value is defined.
 * @param payload The JWT claims payload.
 * @returns The signed JWT string.
 */
export declare function signRefreshToken(payload: object): string;
export declare function verifyAccessToken(token: string): {
    valid: boolean;
    expired: boolean;
    decoded: string | jwt.JwtPayload;
};
export declare function verifyRefreshToken(token: string): {
    valid: boolean;
    expired: boolean;
    decoded: string | jwt.JwtPayload;
};
//# sourceMappingURL=jwt.d.ts.map