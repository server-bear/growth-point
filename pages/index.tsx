import Link from 'next/link';
import endpoints from '../constants/endpoints';

const Home = () => (
  <main>
    <h1>Hello!</h1>
    <Link href={endpoints.pages.hackatons}>
      <a>Hackatons</a>
    </Link>
  </main>
);

export default Home;
