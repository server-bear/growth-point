import React from 'react';
import App, { AppProps, AppContext } from 'next/app';
import 'bulma/css/bulma.css';
import ServerCookies from 'cookies';
import { ServerResponse } from 'http';

import AuthProvider from '../context/authContext';
import ProtectRoute from '../context/ProtectRoute';

type MyProps = {
  token: string
};

function MyApp({ Component, pageProps, token }: AppProps & MyProps) {
  return (
    <AuthProvider token={token}>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<any> => {
  const appProps = await App.getInitialProps(appContext);

  const { res, req } = appContext.ctx;

  if (!req) return { ...appProps };
  const cookies = new ServerCookies(req, res as ServerResponse);

  const token = cookies.get('token');

  return { ...appProps, token };
};

export default MyApp;
