export const __prod__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = process.env.COOKIE_NAME || 'default';
export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'default';
export const FORGOT_PASS_PREFIX = process.env.FORGOT_PASS_PREFIX || 'default';
export const CONFIRM_EMAIL_PREFIX = process.env.FORGOT_PASS_PREFIX || 'default';
export const EDIT_EMAIL_PREFIX = process.env.EDIT_EMAIL_PREFIX || 'default';
export const CHECKOUT_SERVICE_PREFIX =
  process.env.CHECKOUT_SERVICE_PREFIX || 'CHECKOUT_SERVICE_PREFIX';
export const CHECKOUT_SERVICE_SIGNATURE_PREFIX =
  process.env.CHECKOUT_SERVICE_SIGNATURE_PREFIX ||
  'CHECKOUT_SERVICE_SIGNATURE_PREFIX';
export const WEB_VIEW_URL = process.env.WEB_VIEW_URL || 'http://localhost:3000';
export const SERVER_URL = process.env.SERVER_URL || 'default';

export const TEST_GENERATED_UUID = 'generatedUUID';
