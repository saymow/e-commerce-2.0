import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  UsersDefaultInteractionState,
  UsersListState,
  UsersLoginState,
} from '../../../@types/redux/user';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  confirmUser,
  deleteUser,
  listUsers,
  setUserAdmin,
} from '../../../actions/userActions';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { ReduxState } from '../../../store';

import { Container, Options, Checked, Unchecked, DeleteIcon } from './styles';

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

  function handleEditUser(id: string) {
    history.push(`/panel/users/${id}/edit`);
  }

  function handleDeleteUser(id: string, email: string) {
    if (window.confirm(`Do you really wanna delete ${email}?`)) {
      dispatch(deleteUser(id, email));
    }
  }

  function handleToggleUserAdmin(id: string, email: string) {
    if (window.confirm(`Do you really want to set ${email} as admin?`)) {
      dispatch(setUserAdmin(id, email));
    }
  }

  function handleToggleConfirmUser(
    id: string,
    email: string,
    isConfirmed: boolean
  ) {
    if (
      window.confirm(
        `Do you really want to ${
          isConfirmed ? 'DISCONFIRM' : 'CONFIRM'
        } the user ${email}?`
      )
    )
      dispatch(confirmUser(id, email));
  }

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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact number</th>
              <th>Confirmed</th>
              <th>Admin</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>
                  {user.id === (signedAdmin as any).id ? (
                    <strong>{user.name}</strong>
                  ) : (
                    user.name
                  )}
                </td>
                <td>{user.email}</td>
                <td>{user.contact_number}</td>
                <td>
                  <span
                    onClick={() =>
                      handleToggleConfirmUser(
                        user.id,
                        user.email,
                        user.is_confirmed
                      )
                    }
                  >
                    {user.is_confirmed ? <Checked /> : <Unchecked />}
                  </span>
                </td>
                <td>
                  {user.is_admin ? (
                    <Checked className="no-action" />
                  ) : (
                    <Unchecked
                      onClick={() => handleToggleUserAdmin(user.id, user.email)}
                    />
                  )}
                </td>
                <td>
                  {(!user.is_admin || user.id === (signedAdmin as any).id) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit
                    </Button>
                  )}
                </td>
                <td>
                  {(!user.is_admin || user.id === (signedAdmin as any).id) && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id, user.email)}
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Users;
