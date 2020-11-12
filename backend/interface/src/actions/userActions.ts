import axios from 'axios';
import { Dispatch } from '../@types/redux';
import {
  UserLoginAction,
  UsersConfirmAction,
  UsersCreateAction,
  UsersDeleteAction,
  UsersEditAction,
  UsersListAction,
  UsersSetAdminAction,
  UsersShowAction,
} from '../@types/redux/user';

export const userLogin = (email: string, password: string) => async (
  dispatch: Dispatch<UserLoginAction>
) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const { data } = await axios.post('/api/admin/sessions', {
      email,
      password,
    });

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
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

    const { data } = await axios.post('/api/admin/sessions/me');

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
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

export const confirmUser = (id: string) => async (
  dispatch: Dispatch<UsersConfirmAction>
) => {
  try {
    dispatch({ type: 'USER_CONFIRM_REQUEST' });

    await axios.post(`/api/admin/users/confirm/${id}`);

    dispatch({ type: 'USER_CONFIRM_SUCCESS' });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_CONFIRM_FAIL', payload: err.response.data });
  }
};

export const setUserAdmin = (id: string) => async (
  dispatch: Dispatch<UsersSetAdminAction>
) => {
  try {
    dispatch({ type: 'USER_SET_ADMIN_REQUEST' });

    await axios.post(`/api/admin/users/admin/${id}`);

    dispatch({ type: 'USER_SET_ADMIN_SUCCESS' });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_SET_ADMIN_FAIL', payload: err.response.data });
  }
};

export const deleteUser = (id: string) => async (
  dispatch: Dispatch<UsersDeleteAction>
) => {
  try {
    dispatch({ type: 'USER_DELETE_REQUEST' });

    await axios.delete(`/api/admin/users/${id}`);

    dispatch({ type: 'USER_DELETE_SUCCESS' });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_DELETE_FAIL', payload: err.response.data });
  }
};

export const createUser = (user: any) => async (
  dispatch: Dispatch<UsersCreateAction>
) => {
  try {
    dispatch({ type: 'USER_CREATE_REQUEST' });

    const { data } = await axios.post('/api/admin/users', user);

    dispatch({ type: 'USER_CREATE_SUCCESS', payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_CREATE_FAIL', payload: err.response.data });
  }
};

export const editUser = (user: any, id: string) => async (
  dispatch: Dispatch<UsersEditAction>
) => {
  try {
    dispatch({ type: 'USER_EDIT_REQUEST' });

    const { data } = await axios.put(`/api/admin/users/${id}`, user);

    dispatch({ type: 'USER_EDIT_SUCCESS', payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_EDIT_FAIL', payload: err.response.data });
  }
};

export const showUser = (id: string) => async (
  dispatch: Dispatch<UsersShowAction>
) => {
  try {
    dispatch({ type: 'USER_SHOW_REQUEST' });

    const { data } = await axios.get(`/api/admin/users/${id}`);

    dispatch({ type: 'USER_SHOW_SUCCESS', payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'USER_SHOW_FAIL', payload: err.response.data });
  }
};
