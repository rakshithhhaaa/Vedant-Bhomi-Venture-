/**
 * Client-side Anti-Spam and Rate Limiting Protection
 */

const STORAGE_KEY = 'vebco_last_submission_ts';
const SUBMISSION_COOLDOWN_MS = 30 * 1000; // 30 seconds cooldown between submissions

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

/**
 * Checks honeypot field and submission timing
 * @param honeypotValue - Value from hidden field (must be empty for real users)
 * @param formRenderTime - Timestamp when the form was rendered (bots submit in < 1s)
 */
export function validateFormSpam(honeypotValue: string, formRenderTime: number): SpamCheckResult {
  // 1. Honeypot check: If the hidden honeypot input is filled, it's a bot
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return { isSpam: true, reason: 'Automated submission detected.' };
  }

  // 2. Speed check: Human cannot fill out and submit form in under 1.5 seconds
  const elapsed = Date.now() - formRenderTime;
  if (elapsed < 1500) {
    return { isSpam: true, reason: 'Form submitted too quickly. Please try again.' };
  }

  // 3. Client Rate limit check: Ensure consecutive submissions are spaced out
  const lastSubmission = localStorage.getItem(STORAGE_KEY);
  if (lastSubmission) {
    const timeSinceLast = Date.now() - parseInt(lastSubmission, 10);
    if (timeSinceLast < SUBMISSION_COOLDOWN_MS) {
      const remainingSecs = Math.ceil((SUBMISSION_COOLDOWN_MS - timeSinceLast) / 1000);
      return {
        isSpam: true,
        reason: `Please wait ${remainingSecs} seconds before submitting another enquiry.`
      };
    }
  }

  return { isSpam: false };
}

/**
 * Records successful submission timestamp for rate limiting
 */
export function recordSuccessfulSubmission(): void {
  localStorage.setItem(STORAGE_KEY, Date.now().toString());
}
