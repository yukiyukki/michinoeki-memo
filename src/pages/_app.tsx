import 'dayjs/locale/ja';

import dayjs from 'dayjs';
import NextApp, { AppProps } from 'next/app';
import { Router } from 'next/router';
import React from 'react';

import * as gtag from '../gtag';
import { AppStylesProvider } from '../styles/AppStylesProvider';
import CssBaseline from '@mui/material/CssBaseline';

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
        <CssBaseline />
        <Component {...pageProps} />
      </AppStylesProvider>
    );
  }
}

export default App;
