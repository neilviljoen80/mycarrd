import crypto from "crypto";

export function verifyWhopWebhook(
    payload: string,
    signature: string,
    secret: string
): boolean {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(payload).digest("hex");

    return signature === digest;
}
