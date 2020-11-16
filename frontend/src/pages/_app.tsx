import { FC } from "react";

import GlobalStyles from "../styles/globalStyles";

function MyApp({ Component, pageProps }: { Component: FC; pageProps: any }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
