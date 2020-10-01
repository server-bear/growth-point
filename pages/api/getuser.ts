import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from '../../utils/server/firebaseAdmin';
import { verifyToken } from '../../utils/server/verifyToken';

const getuser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.headers;

    const decodedToken = await verifyToken(token as string);

    if (decodedToken) {
      // const user = firebaseAdmin.auth().getuser(decodedToken.uid);

      const usersRef = firebaseAdmin.database().ref('users');
      const snapshot = await usersRef.once('value');
      const user = snapshot.child(decodedToken.uid).exportVal();

      res.status(200).json({ user });
    } else {
      res.status(403).json({ error: 'Token is invalid' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default getuser;
