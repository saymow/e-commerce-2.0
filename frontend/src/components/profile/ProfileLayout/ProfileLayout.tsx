import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionState } from "../../../@types/redux/user";
import { sessionLogout } from "../../../actions/userActions";
import { reduxStore } from "../../../store";
import Link from "../../core/Link";
import {
  ArrowIcon,
  Container,
  Content,
  Info,
  MainInfo,
  Navigation,
  Tab,
  UserAvatar,
  UserIcon,
  LogoutButton,
} from "./styles";

const ProfileLayout: React.FC = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { user } = useSelector<typeof reduxStore>(
    (state) => state.userSession
  ) as SessionState;

  const handleLogout = () => dispatch(sessionLogout());

  return (
    <Container>
      <Info>
        <div>
          <MainInfo>
            <UserAvatar>
              <UserIcon />
            </UserAvatar>
            <h1>{user?.name}</h1>
          </MainInfo>
          <Navigation>
            <Tab className={router.pathname === "/profile" ? "active" : ""}>
              <Link href="/profile">Profile</Link>
              <ArrowIcon />
            </Tab>
            <Tab
              className={router.pathname === "/profile/orders" ? "active" : ""}
            >
              <Link href="/profile/orders">History</Link>
              <ArrowIcon />
            </Tab>
            <Tab
              className={
                router.pathname === "/profile/addresses" ? "active" : ""
              }
            >
              <Link href="/profile/addresses">Addresses</Link>
              <ArrowIcon />
            </Tab>
            <Tab
              className={
                router.pathname === "/profile/change-password" ? "active" : ""
              }
            >
              <Link href="/profile/change-password">Change Password</Link>
              <ArrowIcon />
            </Tab>
            <Tab>
              <LogoutButton onClick={handleLogout}>Sign out</LogoutButton>
              <ArrowIcon />
            </Tab>
          </Navigation>
        </div>
      </Info>
      <Content>{children}</Content>
    </Container>
  );
};

export default ProfileLayout;
