import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UsersListState } from '../../../@types/redux/user';
import { Table, Button } from 'react-bootstrap';

import { listUsers } from '../../../actions/userActions';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { ReduxState } from '../../../store';

import { Container, Options, Checked, Unchecked } from './styles';

const Users: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, users, error } = useSelector<typeof ReduxState>(
    state => state.userList
  ) as UsersListState;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  function handleCreateUser() {}
  function handleEditUser() {}
  function handleDeleteUser() {}
  function handleToggleUserAdmin(id: string) {}
  function handleToggleUserConfirmed(id: string) {}

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
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact number</th>
            <th>Is confirmed</th>
            <th>Is admin</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact_number}</td>
                <td>
                  <span onClick={() => handleToggleUserConfirmed(user.id)}>
                    {user.is_confirmed ? <Checked /> : <Unchecked />}
                  </span>
                </td>
                <td>
                  <span onClick={() => handleToggleUserAdmin(user.id)}>
                    {user.is_admin ? <Checked /> : <Unchecked />}
                  </span>
                </td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Users;
