import Link from 'next/link';
import React, { useEffect } from 'react';
import endpoints from '../constants/endpoints';
import { useUser } from '../context/userContext';
import firebase from '../utils/server/firebaseClient';

const Home = () => {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user);
    }
    // You also have your firebase app initialized
    console.log(firebase);
  }, [loadingUser, user]);

  return (
    <main>
      <h1>Hello!</h1>
      <Link href={endpoints.pages.hackathons}>
        <a>Hackathons</a>
      </Link>
    </main>
  );
};

export default Home;
