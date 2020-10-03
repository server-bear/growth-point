import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import firebaseClient from '../../utils/server/firebaseClient';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;
    await firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.NONE);

    const { user } = await firebaseClient.auth().signInWithEmailAndPassword(email, password);
    const tokenResult = await user?.getIdTokenResult();

    await firebaseClient.auth().signOut();

    res.setHeader(
      'Set-Cookie',
      serialize('token', tokenResult?.token ?? '', {
        expires: new Date(tokenResult?.expirationTime ?? ''),
        path: '/',
        httpOnly: true,
      }),
    );
    res.status(200).json({ user, token: tokenResult?.token });
  } catch (e) {
    res.status(500).json({ error: e.message, code: e.data.code });
  }
};

export default login;
