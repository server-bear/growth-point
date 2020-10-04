import * as firebaseClient from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const credentials = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp(credentials);
}

export default firebaseClient;
