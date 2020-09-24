import Link from 'next/link';
import React, { useEffect } from 'react';
import endpoints from '../constants/endpoints';
import { useUser } from '../context/userContext';
import firebase from '../utils/server/firebaseClient';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

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

  if (!user) {
    return (
      <LoginForm />
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Привет!
              </h1>
              <h2 className="subtitle">
                <Link href={endpoints.pages.hackathons}>
                  <a>Хакатоны</a>
                </Link>
              </h2>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
