import Link from 'next/link';
import React from 'react';
import endpoints from '../constants/endpoints';
import Header from '../components/Header';
import { useAuth } from '../context/authContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Привет,
                {' '}
                {user?.firstName}
                !
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
