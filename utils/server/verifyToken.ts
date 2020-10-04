import firebaseAdmin from './firebaseAdmin';

const verifyToken = async (token: string) => firebaseAdmin.auth().verifyIdToken(token);

export default verifyToken;
