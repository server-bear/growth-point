import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import signup from '../../utils/firebase/signup';
import endpoints from '../../constants/endpoints';

const handleSignup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user, token, expirationTime } = await signup(req.body);

    res.setHeader('Set-Cookie', serialize('token', token, {
      path: endpoints.pages.index,
      httpOnly: true,
      expires: new Date(expirationTime),
    }));

    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default handleSignup;
