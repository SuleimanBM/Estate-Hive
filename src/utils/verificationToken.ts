import jwt from "jsonwebtoken";

export function generateVerificationToken(userId: string): string {
    return jwt.sign(
        { userId, type: "emailVerification" }, // payload
        process.env.JWT_SECRET!,               // secret key
        { expiresIn: "24h" }                   // expires in 24h
    );
}

export function verifyVerificationToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!)
}