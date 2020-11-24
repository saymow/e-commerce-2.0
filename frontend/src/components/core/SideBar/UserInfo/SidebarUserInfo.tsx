import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionState } from "../../../../@types/redux/user";
import { sessionLogout } from "../../../../actions/userActions";
import { reduxStore } from "../../../../store";
import Link from "../../Link";

import { ActionText, Container, UserIcon } from "./styles";

const UserInfo: React.FC = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector<typeof reduxStore>(
    (state) => state.userSession
  ) as SessionState;

  const handleLogout = () => dispatch(sessionLogout());

  return (
    <Container>
      {auth ? (
        <>
          <Link href="/profile">
            <UserIcon />
          </Link>
          <ActionText onClick={handleLogout}>Logout</ActionText>
        </>
      ) : (
        <Link href="/signin">
          <ActionText>sign in</ActionText>
        </Link>
      )}
    </Container>
  );
};

export default UserInfo;
