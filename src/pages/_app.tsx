import React from 'react';
import NextApp, { AppProps } from 'next/app';
import { AppStylesProvider } from '../styles/AppStylesProvider';
import { RecoilRoot } from 'recoil';

type Props = AppProps;

class App extends NextApp {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <RecoilRoot>
        <AppStylesProvider>
          <Component {...pageProps} />
        </AppStylesProvider>
      </RecoilRoot>
    );
  }
}

export default App;
