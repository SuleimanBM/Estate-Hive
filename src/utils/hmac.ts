import crypto from "crypto";

export const hmacProcess = (data: string, secret: string): string => {
    return crypto.createHmac("sha256", secret).update(data).digest("hex");
};
