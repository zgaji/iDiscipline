const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.assignStudentRole = functions.auth.user().onCreate(async (user) => {
  const email = user.email;

  if (!email) {
    console.log("⚠️ No email found for user.");
    return;
  }

  try {
    const userDoc = await admin.firestore().collection("users").doc(email).get();
    const userData = userDoc.data();

    if (userData && userData.role === "student") {
      await admin.auth().setCustomUserClaims(user.uid, { role: "student" });
      console.log(`✅ Custom claim 'student' set for ${email}`);
    } else {
      console.log(`ℹ️ Skipped role setting for ${email}. Role in Firestore: ${userData?.role}`);
    }
  } catch (error) {
    console.error(`❌ Failed to set custom claim for ${email}:`, error.message);
  }
});
