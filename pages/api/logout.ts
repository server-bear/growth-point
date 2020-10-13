import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import endpoints from '../../constants/endpoints';

const handleLogout = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader('Set-Cookie', serialize('token', '', {
      path: endpoints.pages.index,
      httpOnly: true,
    }));

    res.status(200).json({ status: 'OK' });
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: e.message });
  }
};

export default handleLogout;
