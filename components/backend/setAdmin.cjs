// setAdmin.cjs

const admin = require("firebase-admin");
const fs = require("fs");

// Load service account key
const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Set the admin role
const email = "darthzcellen@gmail.com"; // your admin email

admin
  .auth()
  .getUserByEmail(email)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { role: "admin" });
  })
  .then(() => {
    console.log(`✅ Admin claim set for ${email}`);
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error setting admin role:", error);
    process.exit(1);
  });
