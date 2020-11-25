export const __prod__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = process.env.COOKIE_NAME || 'default';
export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'default';
export const FORGOT_PASS_PREFIX = process.env.FORGOT_PASS_PREFIX || 'default';
export const CONFIRM_EMAIL_PREFIX = process.env.FORGOT_PASS_PREFIX || 'default';
export const WEB_VIEW_URL = process.env.WEB_VIEW_URL || 'http://localhost:3000';
export const SERVER_URL = process.env.SERVER_URL || 'default';
