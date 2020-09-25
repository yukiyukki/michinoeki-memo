import React from "react";
import NextApp, { AppProps } from "next/app";
import {
  RecoilRoot,
} from 'recoil';

interface Props extends AppProps {}

class App extends NextApp {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    );
  }
}

export default App;
