import { getFirebaseInstance } from './getFirebaseInstance';
import { Hackathon } from '../../types/hackathon';

const getHackathons = async () => {
  const firebaseInstance = getFirebaseInstance();
  const hackathonsRef = firebaseInstance.database().ref('hackathons');
  const snapshot = await hackathonsRef.once('value');
  const hackathons: Hackathon[] = snapshot.val();

  await firebaseInstance.delete();

  return hackathons;
};

export default getHackathons;
