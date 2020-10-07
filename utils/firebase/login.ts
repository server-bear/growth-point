import { getFirebaseInstance } from './getFirebaseInstance';
import errors from '../../constants/errors';

type LoginParams = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginParams) => {
  // with common instance we get a timeout on netlify
  const firebaseAuthInstance = getFirebaseInstance();
  const firebaseDatabaseInstance = getFirebaseInstance();

  const { user } = await firebaseAuthInstance.auth().signInWithEmailAndPassword(email, password);

  if (!user) {
    throw new Error(errors.login);
  }

  const usersRef = firebaseDatabaseInstance.database().ref('users');
  const snapshot = await usersRef.once('value');
  const userData = snapshot.child(user.uid).exportVal();
  const { token, expirationTime } = await user.getIdTokenResult();

  await firebaseAuthInstance.delete();
  await firebaseDatabaseInstance.delete();

  return { user: userData, token, expirationTime };
};

export default login;
