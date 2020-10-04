import Link from 'next/link';
import React from 'react';
import endpoints from '../constants/endpoints';
import Header from '../components/Header';
import { User } from '../types/user';

const Home = ({ user }: { user: User }) => (
  <>
    <Header />
    <main>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Привет,
              {' '}
              {user?.email}
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
export default Home;
