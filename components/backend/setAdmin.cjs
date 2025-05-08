
const admin = require("firebase-admin");
const fs = require("fs");


const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const email = "darthzcellen@gmail.com";
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
