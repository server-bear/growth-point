import { NextApiRequest, NextApiResponse } from 'next';
import firebaseClient from '../../utils/server/firebaseClient';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await firebaseClient.auth().signOut();

    res.status(200).json({ status: 'OK' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default logout;
