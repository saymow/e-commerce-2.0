import React, { useCallback, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  User,
  UserOnPing,
  UsersDefaultInteractionState,
  UsersListState,
  UsersLoginState,
} from '../../../@types/redux/user';
import {
  confirmUser,
  deleteUser,
  listUsers,
  setUserAdmin,
} from '../../../actions/userActions';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { ReduxState } from '../../../store';
import Table, { Row } from '../../../components/Table';
import { Checked, Container, DeleteIcon, Options, Unchecked } from './styles';

const COLUMNS = {
  count: '#',
  name: 'Name',
  email: 'Email',
  phone: 'Contact number',
  confirmed: 'Confirmed',
  admin: 'Admin',
  edit: 'Edit',
  delete: 'Delete',
};

const makeRows = (
  users: User[],
  currentAdmin: UserOnPing,
  handleToggleConfirmUser: (
    id: string,
    email: string,
    isConfirmed: boolean
  ) => void,
  handleToggleUserAdmin: (id: string, email: string) => void,
  handleDeleteUser: (id: string, email: string) => void,
  handleEditUser: (id: string) => void
): Array<Row<typeof COLUMNS>> => {
  return users.map((user, idx) => ({
    count: idx + 1,
    name: user.name,
    email: user.email,
    phone: user.contact_number,
    confirmed: (
      <span
        onClick={() =>
          handleToggleConfirmUser(user.id, user.email, user.is_confirmed)
        }
      >
        {user.is_confirmed ? <Checked /> : <Unchecked />}
      </span>
    ),
    admin: user.is_admin ? (
      <Checked className="no-action" />
    ) : (
      <Unchecked onClick={() => handleToggleUserAdmin(user.id, user.email)} />
    ),
    edit:
      !user.is_admin ||
      (user.id === currentAdmin.id && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleEditUser(user.id)}
        >
          Edit
        </Button>
      )),
    delete:
      !user.is_admin ||
      (user.id === currentAdmin.id && (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDeleteUser(user.id, user.email)}
        >
          <DeleteIcon />
        </Button>
      )),
  }));
};

const Users: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector<typeof ReduxState>(
    state => state.userList
  ) as UsersListState;
  const { user: signedAdmin } = useSelector<typeof ReduxState>(
    state => state.userLogin
  ) as UsersLoginState;

  const {
    error: confirmationError,
    success: confirmationSuccess,
    reset: confirmationReset,
    identifier: confirmationIdentifier,
  } = useSelector<typeof ReduxState>(
    state => state.userConfirm
  ) as UsersDefaultInteractionState;

  const {
    error: setAdminError,
    success: setAdminSuccess,
    reset: setAdminReset,
    identifier: setAdminIdentifier,
  } = useSelector<typeof ReduxState>(
    state => state.userSetAdmin
  ) as UsersDefaultInteractionState;

  const {
    error: deleteError,
    success: deleteSuccess,
    reset: deleteReset,
    identifier: deleteIdentifier,
  } = useSelector<typeof ReduxState>(
    state => state.userDelete
  ) as UsersDefaultInteractionState;

  useEffect(() => {
    if (confirmationSuccess && confirmationReset) {
      toast.success(
        `User ${confirmationIdentifier} confirmed status updated successfully.`
      );
      dispatch(confirmationReset());
      dispatch(listUsers());
    } else if (setAdminSuccess && setAdminReset) {
      toast.success(`User ${setAdminIdentifier} set as admin successfully.`);
      dispatch(setAdminReset());
      dispatch(listUsers());
    } else if (deleteSuccess && deleteReset) {
      toast.success(`User ${deleteIdentifier} deleted successfully.`);
      dispatch(deleteReset());
      dispatch(listUsers());
    }
  }, [
    setAdminSuccess,
    setAdminReset,
    confirmationReset,
    confirmationSuccess,
    dispatch,
    deleteSuccess,
    deleteReset,
    confirmationIdentifier,
    setAdminIdentifier,
    deleteIdentifier,
  ]);

  useEffect(() => {
    if (confirmationError && confirmationReset) {
      toast.error(`Error on confirming user ${confirmationIdentifier}.`);
      dispatch(confirmationReset());
    } else if (deleteError && deleteReset) {
      toast.error(`Error on deleting user ${deleteIdentifier}.`);
      dispatch(deleteReset());
    }
    if (setAdminError && setAdminReset) {
      toast.error(`Error on confirming user ${setAdminIdentifier}.`);
      dispatch(setAdminReset());
    }
  }, [
    confirmationError,
    confirmationIdentifier,
    confirmationReset,
    deleteError,
    deleteIdentifier,
    deleteReset,
    dispatch,
    setAdminError,
    setAdminIdentifier,
    setAdminReset,
  ]);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  function handleCreateUser() {
    history.push('/panel/users/create');
  }

  const handleEditUser = useCallback(
    (id: string) => {
      history.push(`/panel/users/${id}/edit`);
    },
    [history]
  );

  const handleDeleteUser = useCallback(
    (id: string, email: string) => {
      if (window.confirm(`Do you really wanna delete ${email}?`)) {
        dispatch(deleteUser(id, email));
      }
    },
    [dispatch]
  );

  const handleToggleUserAdmin = useCallback(
    (id: string, email: string) => {
      if (window.confirm(`Do you really want to set ${email} as admin?`)) {
        dispatch(setUserAdmin(id, email));
      }
    },
    [dispatch]
  );

  const handleToggleConfirmUser = useCallback(
    (id: string, email: string, isConfirmed: boolean) => {
      if (
        window.confirm(
          `Do you really want to ${
            isConfirmed ? 'DISCONFIRM' : 'CONFIRM'
          } the user ${email}?`
        )
      )
        dispatch(confirmUser(id, email));
    },
    [dispatch]
  );

  const rows = useMemo(
    () =>
      makeRows(
        users ?? [],
        signedAdmin as UserOnPing,
        handleToggleConfirmUser,
        handleToggleUserAdmin,
        handleDeleteUser,
        handleEditUser
      ),
    [
      handleDeleteUser,
      handleEditUser,
      handleToggleConfirmUser,
      handleToggleUserAdmin,
      signedAdmin,
      users,
    ]
  );

  return (
    <Container>
      <Options>
        <h1>Users</h1>
        <Button variant="dark" size="lg" onClick={handleCreateUser}>
          Create User
        </Button>
      </Options>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : (
        <Table columns={COLUMNS} idColumn="email" rows={rows} />
      )}
    </Container>
  );
};

export default Users;
