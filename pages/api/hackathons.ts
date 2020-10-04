import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../utils/server/firebaseClient';
import { Hackathon } from '../../types/hackathon';

const getHackathons = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const hackathonsRef = firebase.database().ref('hackathons');
    const snapshot = await hackathonsRef.once('value');
    const hackathons: Hackathon[] = snapshot.val();
    res.status(200).json({ hackathons });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default getHackathons;
