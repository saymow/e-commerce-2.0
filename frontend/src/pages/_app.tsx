import React, { FC } from "react";
import { CustomFC } from "../@types";
import { WithRestriction } from "../components/hocs";

import Context from "../context";

function MyApp({
  Component,
  pageProps,
}: {
  Component: CustomFC;
  pageProps: any;
}) {
  let RealComponent;

  if (Component.restrictVisibility) {
    RealComponent = (
      <WithRestriction type={Component.restrictVisibility}>
        <Component {...pageProps} />
      </WithRestriction>
    );
  } else RealComponent = <Component {...pageProps}></Component>;

  return <Context>{RealComponent}</Context>;
}

export default MyApp;
