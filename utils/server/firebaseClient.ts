import * as firebaseClient from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import credentials from '../../secret.json';

if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp(credentials);
}

export default firebaseClient;
