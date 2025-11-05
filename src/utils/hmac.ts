import crypto from "crypto";

export function verifyHmac(payload: string, signatureHex: string, secret: string): boolean {
  try {
    const expected = crypto.createHmac("sha256", secret).update(payload, "utf8").digest(); // Buffer (32o)
    const actual = Buffer.from(String(signatureHex).trim(), "hex");
    if (actual.length !== expected.length) return false; // évite RangeError
    return crypto.timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
