import { FC } from "react";
import { Provider } from "react-redux";
import store from "../store";

import SideBar from "../components/core/SideBar";

import GlobalStyles from "../styles/globalStyles";

function MyApp({ Component, pageProps }: { Component: FC; pageProps: any }) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
      <SideBar />
    </Provider>
  );
}

export default MyApp;
