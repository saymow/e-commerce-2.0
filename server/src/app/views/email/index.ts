import { WEB_VIEW_URL } from '../../constants';

export const forgotPasswordEmailView = (name: string, token: string) => {
  let response = '';
  response += `<h1>Hi ${name}. You've requested a password reset</h1>`;
  response += '<p>You can set a new password clicking on ';
  response += `<a href="${WEB_VIEW_URL}/change-password/${token}">this link here</a>. </p>`;

  return response;
};
