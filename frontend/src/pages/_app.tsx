import { FC } from "react";
import { Provider } from "react-redux";
import store from "../store";

import GlobalStyles from "../styles/globalStyles";

function MyApp({ Component, pageProps }: { Component: FC; pageProps: any }) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
