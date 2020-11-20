import { FC } from "react";

import Context from "../context";

function MyApp({ Component, pageProps }: { Component: FC; pageProps: any }) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
