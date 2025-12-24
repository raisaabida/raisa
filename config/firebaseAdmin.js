import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

let adminApp = null;


if (process.env.FIREBASE_SERVICE_ACCOUNT && process.env.FIREBASE_SERVICE_ACCOUNT !== "{}") {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    if (serviceAccount.project_id && !admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      adminApp = admin;
    }
  } catch (error) {
    console.warn("Failed to initialize Firebase:", error.message);
  }
}

export default adminApp || admin;
