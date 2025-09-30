import jwt from "jsonwebtoken";
export declare function generateVerificationToken(userId: string): string;
export declare function verifyVerificationToken(token: string): string | jwt.JwtPayload;
//# sourceMappingURL=verificationToken.d.ts.map