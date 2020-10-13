import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import login from '../../utils/firebase/login';
import endpoints from '../../constants/endpoints';

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user, token, expirationTime } = await login(req.body);

    res.setHeader('Set-Cookie', serialize('token', token, {
      path: endpoints.pages.index,
      httpOnly: true,
      expires: new Date(expirationTime),
    }));

    res.status(200).json({ user });
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: e.message });
  }
};

export default handleLogin;
