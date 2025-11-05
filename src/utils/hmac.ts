import crypto from 'crypto';

/** Vérifie une signature HMAC simple (EL10). */
export function verifyHmac(payload: string, signatureHex: string, secret: string): boolean {
  const digest = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
  // Comparaison sûre (temps constant)
  return crypto.timingSafeEqual(Buffer.from(digest, 'hex'), Buffer.from(signatureHex, 'hex'));
}
