import {
  UserLoginAction,
  UsersListState,
  UsersListAction,
  UsersConfirmAction,
  UsersSetAdminAction,
  UsersDeleteAction,
  UsersCreateAction,
  UsersCreateState,
  UsersEditAction,
  UsersEditState,
  UsersShowState,
  UsersShowAction,
  UsersLoginState,
  UsersDefaultInteractionState,
} from '../@types/redux/user';

export const userLoginReducer = (
  state: UsersLoginState = { user: {} },
  action: UserLoginAction
): UsersLoginState => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload, user: undefined };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const userListReducer = (
  state: UsersListState = {},
  action: UsersListAction
): UsersListState => {
  switch (action.type) {
    case 'USER_LIST_REQUEST':
      return { ...state, loading: true };
    case 'USER_LIST_SUCCESS':
      return { loading: false, users: action.payload };
    case 'USER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userConfirmReducer = (
  state: UsersDefaultInteractionState = {},
  action: UsersConfirmAction
): UsersDefaultInteractionState => {
  switch (action.type) {
    case 'USER_CONFIRM_REQUEST':
      return {
        ...state,
        loading: true,
        identifier: action.payload,
        reset: () => ({
          type: 'USER_CONFIRM_RESET',
        }),
      };
    case 'USER_CONFIRM_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'USER_CONFIRM_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_CONFIRM_RESET':
      return {};
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state: UsersDefaultInteractionState = {},
  action: UsersDeleteAction
): UsersDefaultInteractionState => {
  switch (action.type) {
    case 'USER_DELETE_REQUEST':
      return {
        ...state,
        loading: true,
        identifier: action.payload,
        reset: () => ({
          type: 'USER_DELETE_RESET',
        }),
      };
    case 'USER_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'USER_DELETE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_DELETE_RESET':
      return {};
    default:
      return state;
  }
};

export const userSetAdminReducer = (
  state: UsersDefaultInteractionState = {},
  action: UsersSetAdminAction
): UsersDefaultInteractionState => {
  switch (action.type) {
    case 'USER_SET_ADMIN_REQUEST':
      return {
        ...state,
        loading: true,
        identifier: action.payload,
        reset: () => ({
          type: 'USER_SET_ADMIN_RESET',
        }),
      };
    case 'USER_SET_ADMIN_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'USER_SET_ADMIN_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_SET_ADMIN_RESET':
      return {};
    default:
      return state;
  }
};

export const userCreateReducer = (
  state: UsersCreateState = {},
  action: UsersCreateAction
): UsersCreateState => {
  switch (action.type) {
    case 'USER_CREATE_REQUEST':
      return {
        ...state,
        loading: true,
        reset: () => ({
          type: 'USER_CREATE_RESET',
        }),
      };
    case 'USER_CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case 'USER_CREATE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_CREATE_RESET':
      return {};
    default:
      return state;
  }
};

export const userEditReducer = (
  state: UsersEditState = {},
  action: UsersEditAction
): UsersEditState => {
  switch (action.type) {
    case 'USER_EDIT_REQUEST':
      return {
        ...state,
        loading: true,
        reset: () => ({
          type: 'USER_EDIT_RESET',
        }),
      };
    case 'USER_EDIT_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case 'USER_EDIT_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_EDIT_RESET':
      return {};
    default:
      return state;
  }
};

export const userShowReducer = (
  state: UsersShowState = {},
  action: UsersShowAction
): UsersShowState => {
  switch (action.type) {
    case 'USER_SHOW_REQUEST':
      return { ...state, loading: true };
    case 'USER_SHOW_SUCCESS':
      return {
        loading: false,
        success: true,
        user: action.payload,
        reset: () => ({
          type: 'USER_SHOW_RESET',
        }),
      };
    case 'USER_SHOW_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'USER_SHOW_RESET':
      return {};
    default:
      return state;
  }
};
