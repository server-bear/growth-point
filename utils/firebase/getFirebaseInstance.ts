import firebase from 'firebase';
import firebaseAdmin from 'firebase-admin';
import { nanoid } from 'nanoid';
import 'firebase/database';

const initialConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  appId: process.env.APP_ID,
};

const adminInitialConfig = {
  ...initialConfig,
  credential: firebaseAdmin.credential.cert({
    // https://community.netlify.com/t/using-firebase-admin-sdk-with-lambda-function/2136
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
    projectId: process.env.PROJECT_ID,
  }),
};

export const getFirebaseInstance = () => firebase.initializeApp(initialConfig, nanoid());

export const getFirebaseAdminInstance = () => firebaseAdmin.initializeApp(
  adminInitialConfig,
  nanoid(),
);
