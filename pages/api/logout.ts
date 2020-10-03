import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // await firebaseClient.auth().signOut();

    res.setHeader(
      'Set-Cookie',
      serialize('token', '', { expires: new Date(), path: '/', httpOnly: true }),
    );
    res.status(200).json({ status: 'OK' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default logout;
