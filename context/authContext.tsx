import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';

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
  token: string
};

function AuthContextComp({ children, token }: AuthContextCompProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Helpful, to update the UI accordingly.

  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        if (token) {
          const { data: userRes } = await axios.get(endpoints.api.getUser, {
            headers: {
              token,
            },
          });
          setUser(userRes);
        } else {
          throw Error('Token is invzlid');
        }
      } catch (e) {
        router.replace(endpoints.pages.login);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

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
    Cookies.remove('token');
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
      isAuthenticated: !!user, user, login, logout, signup, loading,
    } as ILoginContext}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useAuth = () => useContext(AuthContext);

export default AuthContextComp;
