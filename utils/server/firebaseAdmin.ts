import firebaseAdmin from 'firebase-admin';
import serviceAccount from '../../tochki-rosta-firebase-adminsdk-yy8zy-54717621fb.json';
import credentials from '../../secret.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: credentials.databaseURL,
  });
}

// eslint-disable-next-line import/prefer-default-export
export { firebaseAdmin };
