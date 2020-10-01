import React from 'react';
import { AppProps } from 'next/app';
import AuthProvider from '../context/authContext';
import 'bulma/css/bulma.css';
import ProtectRoute from '../context/ProtectRoute';

// Custom App to wrap it with context provider
function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  );
}

export default App;
