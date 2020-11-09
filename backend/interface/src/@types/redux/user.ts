export type userLoginAction =
  | { type: 'USER_LOGIN_REQUEST' }
  | {
      type: 'USER_LOGIN_SUCCESS';
    }
  | { type: 'USER_LOGIN_FAIL'; payload: { message: string } }
  | { type: 'USER_LOGOUT' };
