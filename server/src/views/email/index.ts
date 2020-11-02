import { WEB_VIEW_URL } from '../../constants';

export const forgotPasswordEmailView = (name: string, token: string) => {
  let response = '';
  response += `<h1>Hi ${name}. You've requested a password reset</h1>`;
  response +=
    '<p>You can set a new password clicking on this link in this link ';
  response += `<a href="${WEB_VIEW_URL}/change-password/${token}">here</a>. </p>`;

  return response;
};
