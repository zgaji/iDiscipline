const checkStudentsVerification = async () => {
  const table = new Table({
    head: ["Student Email", "Verified", "Password Sent"],
    colWidths: [30, 15, 20],
  });

  const usersSnapshot = await db.collection("users")
    .where("role", "==", "student")
    .where("passwordSent", "==", false) // Check students who haven't been sent the password
    .get();

  if (usersSnapshot.empty) {
    console.log("✅ No students pending verification. All clear!");
    return;
  }

  for (const docSnap of usersSnapshot.docs) {
    const student = docSnap.data();

    try {
      const userRecord = await admin.auth().getUserByEmail(student.studentEmail);

      // Log if email is verified
      console.log(`Email verification status for ${student.studentEmail}: ${userRecord.emailVerified}`);

      if (userRecord.emailVerified) {
        // Send the password email
        await sendPasswordEmail(student.studentEmail, student.password);
        // Update Firestore to reflect that the password has been sent
        await db.collection("users").doc(docSnap.id).update({ passwordSent: true });

        table.push([student.studentEmail, "✅ Yes", "✅ Sent"]);
      } else {
        table.push([student.studentEmail, "❌ No", "⏳ Waiting"]);
      }
    } catch (error) {
      console.error(`❌ Error checking ${student.studentEmail}:`, error);
    }
  }

  console.log(table.toString());
};
