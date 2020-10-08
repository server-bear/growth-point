import { NextApiRequest, NextApiResponse } from 'next';
import getHackathons from '../../utils/firebase/getHackathons';

const hackathonsHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const hackathons = await getHackathons();

    res.status(200).json({ hackathons });
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: e.message });
  }
};

export default hackathonsHandler;
