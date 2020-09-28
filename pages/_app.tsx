import App, { AppContext, AppProps, AppInitialProps } from 'next/app';
import { AuthProvider } from '../context/authContext';
import { User } from '../types/user';
import redirectLogin from '../utils/auth/redirect';

import 'bulma/css/bulma.css';

type MyProps = {
  user?: User
};

const MyApp = ({ Component, pageProps, user }: AppProps & MyProps) => (
  <AuthProvider user={user}>
    <Component {...pageProps} />
  </AuthProvider>
);

MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps & MyProps> => {
  const appProps = await App.getInitialProps(appContext);
  const { res, req } = appContext.ctx;

  if (!req || !res) {
    return { ...appProps };
  }

  try {
    const { parse } = await import('cookie');
    const { token } = parse(req.headers.cookie ?? '');

    if (token) {
      const { default: getUser } = await import('../utils/firebase/getUser');
      const userData = await getUser(token);

      if (userData) {
        return { ...appProps, user: userData };
      }

      redirectLogin(req, res);
    } else {
      redirectLogin(req, res);
    }

    return { ...appProps };
  } catch (e) {
    console.error(e);

    redirectLogin(req, res);

    return { ...appProps };
  }
};

export default MyApp;
