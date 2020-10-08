import { useEffect, useState } from 'preact/compat';
import { NextPage } from 'next';
import axios from 'axios';
import { Hackathon } from '../types/hackathon';
import { HackathonsApi } from '../types/api';
import endpoints from '../constants/endpoints';
import { useAuth } from '../context/authContext';

type HackathonsProps = {
  hackathons?: Hackathon[];
  error?: string;
};

const Hackathons: NextPage<HackathonsProps> = ({
  hackathons: initialHackathons,
  error: initialError,
}) => {
  const [hackathons, updateHackathons] = useState(initialHackathons);
  const [error, updateError] = useState(initialError);
  const { user } = useAuth();

  useEffect(() => {
    if (hackathons || error) return;

    const fetchHackathons = async () => {
      try {
        const { data } = await axios.get<HackathonsApi>(endpoints.api.hackathons);

        updateHackathons(data.hackathons);
      } catch (e) {
        updateError(e.message);
      }
    };

    fetchHackathons();
  }, [hackathons, error]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!hackathons) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="box">
      <ul>
        <li>
          email:
          {' '}
          {user?.email}
        </li>
        {hackathons.map(({ id, name }) => <li key={id}>{name}</li>)}
      </ul>
    </div>
  );
};

Hackathons.getInitialProps = async ({ req }): Promise<HackathonsProps> => {
  if (!req) return {};

  try {
    const { default: getHackathons } = await import('../utils/firebase/getHackathons');
    const hackathons = await getHackathons();

    return { hackathons };
  } catch (e) {
    return { error: e.message };
  }
};

export default Hackathons;
