import React from "react";

import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

import { Container, Content } from "./styles";

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default Layout;
