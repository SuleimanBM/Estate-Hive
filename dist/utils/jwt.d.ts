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
export declare function signAccessToken(payload: object): never;
export declare function signRefreshToken(payload: object): never;
export declare function verifyAccessToken(token: string): {
    valid: boolean;
    expired: boolean;
    decoded: string | jwt.JwtPayload;
} | {
    valid: boolean;
    expired: boolean;
    decoded: null;
};
export declare function verifyRefreshToken(token: string): {
    valid: boolean;
    expired: boolean;
    decoded: string | jwt.JwtPayload;
} | {
    valid: boolean;
    expired: boolean;
    decoded: null;
};
//# sourceMappingURL=jwt.d.ts.map