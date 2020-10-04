import { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import axios from 'axios';
import { Hackathon } from '../types/hackathon';
import { HackathonsApi } from '../types/api';
import getOriginFromRequest from '../utils/server/getOriginFromRequest';
import endpoints from '../constants/endpoints';

type HackathonsProps = {
  hackathons?: Hackathon[];
  error?: string;
};

const Hackathons = ({ hackathons: initialHackathons, error: initialError }: HackathonsProps) => {
  const [hackathons, updateHackathons] = useState(initialHackathons);
  const [error, updateError] = useState(initialError);

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
        {hackathons.map(({ id, name }) => <li key={id}>{name}</li>)}
      </ul>
    </div>
  );
};

Hackathons.getInitialProps = async ({ req }: NextPageContext): Promise<HackathonsProps> => {
  if (!req) return {};

  try {
    const url = getOriginFromRequest(req) + endpoints.api.hackathons;
    const res = await axios.get<HackathonsApi>(url);
    const { hackathons } = res.data;

    return { hackathons };
  } catch (e) {
    return { error: e.message };
  }
};

export default Hackathons;
