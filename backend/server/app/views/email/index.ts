import { SERVER_URL, WEB_VIEW_URL } from '../../constants';

export const forgotPasswordEmailView = (name: string, token: string) => {
  let response = '';
  response += `<h1>Hi ${name}. You've requested a password reset</h1>`;
  response += '<p>You can set a new password clicking on ';
  response += `<a href="${WEB_VIEW_URL}/change-password/${token}">this link here</a>. </p>`;

  return response;
};

export const confirmAccountEmailView = (name: string, token: string) => {
  let response = '';
  response += `<h1>Hi ${name}. Do you want to confirm your account?</h1>`;
  response += '<p>You can confirm your account by clicking on ';
  response += `<a href="${SERVER_URL}/api/users/confirm/${token}">this link here</a>. </p>`;

  return response;
};
