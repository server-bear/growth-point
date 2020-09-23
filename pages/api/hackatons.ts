import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/server/database';
import { Hackaton } from '../../types/hackaton';

const getHackatons = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const hackatonsRef = db.ref('hackatons');
    const snapshot = await hackatonsRef.once('value');
    const hackatons: Hackaton[] = snapshot.val();

    res.status(200).json({ hackatons });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default getHackatons;
