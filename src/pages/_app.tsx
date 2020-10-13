import React from 'react';
import NextApp, { AppProps } from 'next/app';
import { AppStylesProvider } from '../styles/AppStylesProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as gtag from '../gtag';
import { Router } from 'next/router';

type Props = AppProps;

class App extends NextApp {
  constructor(props: Props) {
    super(props);
    dayjs.locale('ja');
    Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));
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
