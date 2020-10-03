import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../utils/server/firebaseAdmin';

const verifytoken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.headers;

    const correct = await firebaseAdmin.auth().verifyIdToken(token as string);

    if (correct) {
      res.status(200).json({ status: 'OK' });
    } else {
      res.status(403).json({ error: 'Token is invalid' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default verifytoken;
