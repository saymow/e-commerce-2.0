export interface userLoginState {
  loading?: boolean;
  error?: {
    message: string;
  };
  auth?: boolean;
}

export type userLoginAction =
  | { type: 'USER_LOGIN_REQUEST' }
  | {
      type: 'USER_LOGIN_SUCCESS';
    }
  | { type: 'USER_LOGIN_FAIL'; payload: { message: string } }
  | { type: 'USER_LOGOUT' };

export const userLoginReducer = (
  state: userLoginState = { auth: true },
  action: userLoginAction
): userLoginState => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, auth: true };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload, auth: false };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};
