import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authContext';
import LoadingScreen from '../components/LoadingScreen';
import endpoints from '../constants/endpoints';

const allowRoutes = [
  endpoints.pages.login,
  endpoints.pages.signup,
];

type Props = {
  children: ReactNode | ReactNode[]
};

const ProtectRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading || (!isAuthenticated && !allowRoutes.includes(router.pathname))) {
    return <LoadingScreen />;
  }
  return (
    <>
      {React.Children
        .toArray(children)}
    </>
  );
};

export default ProtectRoute;