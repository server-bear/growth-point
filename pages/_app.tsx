import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import 'bulma/css/bulma.css';

import { AuthProvider } from '../context/authContext';
import endpoints from '../constants/endpoints';
import { User } from '../types/user';
import getOriginFromRequest from '../utils/server/getOriginFromRequest';
import redirectLogin from '../utils/auth/redirect';

type MyProps = {
  user: User
};

function MyApp({
  Component, pageProps, user,
}: AppProps & MyProps) {
  return (
    <AuthProvider user={user}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<any> => {
  const appProps = await App.getInitialProps(appContext);

  const { res, req } = appContext.ctx;

  if (!req) return { ...appProps };
  const url = getOriginFromRequest(req);

  const { parse } = await import('cookie');
  const { default: axios } = await import('axios');

  const { token } = parse(req.headers.cookie ?? '');

  let user = null;

  if (token) {
    const { data: userRes, status } = await axios.get(url + endpoints.api.getUser, {
      headers: {
        token,
      },
    });

    if (status === 200) {
      user = userRes;
    } else {
      redirectLogin(req, res);
    }
  } else {
    redirectLogin(req, res);
  }

  return { ...appProps, user };
};

export default MyApp;
