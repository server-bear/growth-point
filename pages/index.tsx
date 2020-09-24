import Link from 'next/link';
import endpoints from '../constants/endpoints';

const Home = () => (
  <main>
    <h1>Hello!</h1>
    <Link href={endpoints.pages.hackathons}>
      <a>Hackathons</a>
    </Link>
  </main>
);

export default Home;
