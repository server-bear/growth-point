import { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import axios from 'axios';
import { Hackaton } from '../types/hackaton';
import { HackatonsApi } from '../types/api';
import getOriginFromRequest from '../utils/server/getOriginFromRequest';
import endpoints from '../constants/endpoints';

type HackatonsProps = {
  hackatons?: Hackaton[];
  error?: string;
};

const Hackatons = ({ hackatons: initialHackatons, error: initialError }: HackatonsProps) => {
  const [hackatons, updateHackatons] = useState(initialHackatons);
  const [error, updateError] = useState(initialError);

  useEffect(() => {
    if (hackatons || error) return;

    const fetchHackatons = async () => {
      try {
        const { data } = await axios.get<HackatonsApi>(endpoints.api.hackatons);

        updateHackatons(data.hackatons);
      } catch (e) {
        updateError(e.message);
      }
    };

    fetchHackatons();
  }, [hackatons, error]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!hackatons) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {hackatons.map(({ id, name }) => <li key={id}>{name}</li>)}
    </ul>
  );
};

Hackatons.getInitialProps = async ({ req }: NextPageContext): Promise<HackatonsProps> => {
  if (!req) return {};

  try {
    const url = getOriginFromRequest(req) + endpoints.api.hackatons;
    const res = await axios.get<HackatonsApi>(url);
    const { hackatons } = res.data;

    return { hackatons };
  } catch (e) {
    return { error: e.message };
  }
};

export default Hackatons;
