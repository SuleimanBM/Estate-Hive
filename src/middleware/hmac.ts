import crypto from "crypto";

export const hmacProcess = (message: string, secretKey: string): string => {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(message);
    const hmacValue = hmac.digest('hex');
    return hmacValue;
};