import { firebaseAdmin } from './firebaseAdmin';

// eslint-disable-next-line import/prefer-default-export
export const verifyToken = (token: string) => firebaseAdmin.auth().verifyIdToken(token)
  .catch((error) => { throw error; });
