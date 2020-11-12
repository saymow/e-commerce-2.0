import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UsersListState, UsersLoginState } from '../../../@types/redux/user';
import { Table, Button } from 'react-bootstrap';

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
import { DefaultState } from '../../../@types/redux';

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
    loading: confirmationLoading,
    error: confirmationError,
    success: confirmationSuccess,
    reset: confirmationReset,
  } = useSelector<typeof ReduxState>(
    state => state.userConfirm
  ) as DefaultState<{}>;

  const {
    loading: setAdminLoading,
    error: setAdminError,
    success: setAdminSuccess,
    reset: setAdminReset,
  } = useSelector<typeof ReduxState>(
    state => state.userSetAdmin
  ) as DefaultState<{}>;

  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
    reset: deleteReset,
  } = useSelector<typeof ReduxState>(
    state => state.userDelete
  ) as DefaultState<{}>;

  useEffect(() => {
    if (confirmationSuccess && confirmationReset) {
      dispatch(confirmationReset());
      dispatch(listUsers());
    } else if (setAdminSuccess && setAdminReset) {
      dispatch(setAdminReset());
      dispatch(listUsers());
    } else if (deleteSuccess && deleteReset) {
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
      dispatch(deleteUser(id));
    }
  }

  function handleToggleUserAdmin(id: string, email: string) {
    if (window.confirm(`Do you really want to set ${email} as admin?`)) {
      dispatch(setUserAdmin(id));
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
      dispatch(confirmUser(id));
  }

  return (
    <Container>
      <Options>
        <h1>Users</h1>

        <Button variant="dark" size="lg" onClick={handleCreateUser}>
          Create User
        </Button>
      </Options>

      {loading || confirmationLoading || setAdminLoading || deleteLoading ? (
        <Loader />
      ) : error || confirmationError || setAdminError || deleteError ? (
        <Message>
          {error?.message ||
            confirmationError?.message ||
            setAdminError?.message ||
            deleteError?.message}
        </Message>
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
