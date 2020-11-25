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
  LogoutIcon,
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
            className={router.pathname === "/profile/history" ? "active" : ""}
          >
            <Link href="/profile/history">History</Link>
            <ArrowIcon />
          </Tab>
          <Tab
            className={router.pathname === "/profile/addresses" ? "active" : ""}
          >
            <Link href="/profile/addresses">Address</Link>
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
        </Navigation>
      </Info>
      <Content>
        <LogoutIcon onClick={handleLogout} />
        {children}
      </Content>
    </Container>
  );
};

export default ProfileLayout;
