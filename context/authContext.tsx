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
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  signup: (formData: ISignUp) => void
}

export const AuthContext = createContext<ILoginContext>({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

type AuthContextCompProps = {
  children: ReactNode | ReactNode[]
  token?: string
  user: User
};

export function AuthProvider({ children, user: initialUser }: AuthContextCompProps) {
  const [user, setUser] = useState<User | null>(initialUser);

  const router = useRouter();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(endpoints.api.login, { email, password });

      router.push(endpoints.pages.index);

      setUser(data.user);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    await axios.get<LoginResponse>(endpoints.api.logout);
    setUser(null);
    await router.push(endpoints.pages.login);
  };

  const signup = async (formData: ISignUp) => {
    const { data } = await axios.post<LoginResponse>(endpoints.api.signup, formData);

    setUser(data.user);
    await router.push(endpoints.pages.index);
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout, signup,
    } as ILoginContext}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
