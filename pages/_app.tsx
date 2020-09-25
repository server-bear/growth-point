import React from 'react';
import { AppProps } from 'next/app';
import UserProvider from '../context/userContext';
import 'bulma/css/bulma.css';

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
