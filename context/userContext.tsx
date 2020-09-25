import React, {
  useState, useEffect, createContext, useContext, ReactNode,
} from 'react';
import firebase from '../utils/server/firebaseClient';
import { User } from '../types/user';

interface IUserContext {
  user: User | null
  setUser: ((user: User) => void) | null
  loadingUser: boolean
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: null,
  loadingUser: false,
});

type UserContextCompProps = {
  children: ReactNode | ReactNode[]
};

export default function UserContextComp({ children }: UserContextCompProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (_user) => {
      try {
        if (_user) {
          // User is signed in.
          const {
            uid, displayName, email, photoURL,
          } = _user;
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({
            id: uid, firstName: displayName, email, photoURL,
          });
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser } as IUserContext}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
