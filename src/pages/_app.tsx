import React from 'react';
import NextApp, { AppProps } from 'next/app';
import { AppStylesProvider } from '../styles/AppStylesProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

type Props = AppProps;

class App extends NextApp {
  constructor(props: Props) {
    super(props);
    dayjs.locale('ja');
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <AppStylesProvider>
        <Component {...pageProps} />
      </AppStylesProvider>
    );
  }
}

export default App;
