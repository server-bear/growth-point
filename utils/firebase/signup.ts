import { getFirebaseInstance } from './getFirebaseInstance';
import { User } from '../../types/user';
import errors from '../../constants/errors';

type SignupParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const signup = async ({
  email, password, firstName, lastName = '',
}: SignupParams) => {
  // with common instance we get a timeout on netlify
  const firebaseAuthInstance = getFirebaseInstance();
  const firebaseDatabaseInstance = getFirebaseInstance();

  const { user } = await firebaseAuthInstance
    .auth()
    .createUserWithEmailAndPassword(email, password);

  if (!user) {
    throw new Error(errors.signup);
  }

  const { token, expirationTime } = await user.getIdTokenResult();

  const mappedUser: User = {
    id: user.uid,
    email,
    firstName,
    lastName,
  };

  const usersRef = firebaseDatabaseInstance.database().ref('users');

  await usersRef.child(user.uid).set(mappedUser);
  await firebaseDatabaseInstance.delete();
  await firebaseAuthInstance.delete();

  return { user: mappedUser, token, expirationTime };
};

export default signup;
