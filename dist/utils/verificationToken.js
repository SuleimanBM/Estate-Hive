import jwt from "jsonwebtoken";
export function generateVerificationToken(userId) {
    return jwt.sign({ userId, type: "emailVerification" }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: "5m" } // expires in 24h
    );
}
export function verifyVerificationToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
//# sourceMappingURL=verificationToken.js.map