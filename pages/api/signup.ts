import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import firebaseClient from '../../utils/server/firebaseClient';
import { firebaseAdmin } from '../../utils/server/firebaseAdmin';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      email, password, firstName, lastName = '',
    } = req.body;
    await firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.NONE);

    const { user } = await firebaseClient.auth().createUserWithEmailAndPassword(email, password);
    const token = await user?.getIdToken();

    if (!user) { throw Error('No user'); }

    const mappedUser = {
      id: user.uid,
      email: user.email,
      firstName,
      lastName,
    };

    const usersRef = firebaseAdmin.database().ref('users');

    await usersRef.child(user.uid).set(mappedUser);

    await firebaseClient.auth().signOut();

    res.setHeader('Set-Cookie', serialize('token', token ?? '', { path: '/', httpOnly: true }));
    res.status(200).json({ user: mappedUser, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default signup;
