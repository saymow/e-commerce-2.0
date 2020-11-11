import axios from 'axios';
import { Dispatch } from '../@types/redux';
import { UserLoginAction, UsersListAction } from '../@types/redux/user';

export const userLogin = (email: string, password: string) => async (
  dispatch: Dispatch<UserLoginAction>
) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    await axios.post('/api/admin/sessions', { email, password });

    dispatch({ type: 'USER_LOGIN_SUCCESS' });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_LOGIN_FAIL', payload: err.response.data });
  }
};

export const getAuthStatus = () => async (
  dispatch: Dispatch<UserLoginAction>
) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    await axios.post('/api/admin/sessions/me');

    dispatch({ type: 'USER_LOGIN_SUCCESS' });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_LOGOUT' });
  }
};

export const listUsers = () => async (dispatch: Dispatch<UsersListAction>) => {
  try {
    dispatch({ type: 'USER_LIST_REQUEST' });

    const { data } = await axios.get('/api/admin/users');

    dispatch({ type: 'USER_LIST_SUCCESS', payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_LIST_FAIL', payload: err.response.data });
  }
};
