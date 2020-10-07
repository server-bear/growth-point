import { getFirebaseAdminInstance } from './getFirebaseInstance';
import { User } from '../../types/user';

const getUser = async (token: string) => {
  const firebaseInstance = getFirebaseAdminInstance();
  const decodedToken = await firebaseInstance.auth().verifyIdToken(token);

  if (!decodedToken) return null;

  const usersRef = firebaseInstance.database().ref('users');
  const snapshot = await usersRef.once('value');
  const user: User = snapshot.child(decodedToken.uid).exportVal();

  await firebaseInstance.delete();

  return user;
};

export default getUser;
