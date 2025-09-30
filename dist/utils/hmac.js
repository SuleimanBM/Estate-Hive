import crypto from "crypto";
export const hmacProcess = (data, secret) => {
    return crypto.createHmac("sha256", secret).update(data).digest("hex");
};
//# sourceMappingURL=hmac.js.map