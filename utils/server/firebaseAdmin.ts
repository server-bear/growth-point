import firebaseAdmin from 'firebase-admin';

const serviceAccount = {
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  project_id: process.env.PROJECT_ID,
};

const credentials = {
  databaseURL: process.env.DATABASE_URL,
};

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

export default firebaseAdmin;
