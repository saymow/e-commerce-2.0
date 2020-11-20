import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ThemeState } from "../../../@types/redux";
import SideBar from "../../../components/core/SideBar";
import { reduxStore } from "../../../store";
import GlobalStyles from "../../../styles/globalStyles";
import { darkTheme, lightTheme } from "../../../styles/theme";
import Footer from "../Footer";
import Header from "../Header";
import { Container, Content } from "./styles";

interface Props {
  contained?: boolean;
}

const Layout: React.FC<Props> = ({ children, contained = true }) => {
  const { theme } = useSelector<typeof reduxStore>(
    (state) => state.theme
  ) as ThemeState;

  return (
    <ThemeProvider theme={theme === "light-mode" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container>
        <Header />
        <Content contained={contained}>{children}</Content>
        <SideBar />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
