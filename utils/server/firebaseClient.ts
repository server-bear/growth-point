import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import credentials from '../../secret.json';

// const initialConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   appId: process.env.APP_ID,
// };

if (!firebase.apps.length) {
  firebase.initializeApp(credentials);
}

export default firebase;
