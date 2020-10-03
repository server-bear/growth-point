import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import { useRouter } from 'next/router';
import { User } from '../types/user';
import endpoints from '../constants/endpoints';
import { LoginResponse } from '../types/api';

interface ISignUp {
  firstName: string,
  lastName: string
  email: string
  password: string
}

interface ILoginContext {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  signup: (formData: ISignUp) => void
  loading: boolean
}

export const AuthContext = createContext<ILoginContext>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  loading: true,
});

type AuthContextCompProps = {
  children: ReactNode | ReactNode[]
  token?: string
  user: User
};

function AuthContextComp({ children, user: initialUser }: AuthContextCompProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  // const [loading, setLoading] = useState(true); // Helpful, to update the UI accordingly.

  const router = useRouter();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(endpoints.api.login, { email, password });

      router.push(endpoints.pages.index);

      setUser(data.user as any);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    // Cookies.remove('token');
    await axios.get<LoginResponse>(endpoints.api.logout);
    router.push(endpoints.pages.login);
    setUser(null);
  };

  const signup = async (formData: ISignUp) => {
    const { data } = await axios.post<LoginResponse>(endpoints.api.signup, formData);

    router.push(endpoints.pages.index);

    if (setUser) { setUser(data.user as any); }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user, user, login, logout, signup, loading: false,
    } as ILoginContext}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useAuth = () => useContext(AuthContext);

export default AuthContextComp;
