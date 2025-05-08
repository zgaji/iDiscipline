import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../backend/firebaseConfig"; // Adjust path if needed

const sendPasswordEmail = async (studentEmail, password) => {
  try {
    const response = await fetch("https://7b06-112-206-23-242.ngrok-free.app/send-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toEmail: studentEmail, password: password }),
    });
    const result = await response.json();
    if (!result.success) throw new Error("Failed to send password email");
  } catch (error) {
    console.error("Error sending password email:", error);
    throw error;
  }
};

export const checkVerificationAndSendPassword = async () => {
  const auth = getAuth();
  await auth.currentUser?.reload(); // Always reload current user

  const usersRef = collection(firestore, "users");
  const snapshot = await getDocs(usersRef);

  for (const docSnap of snapshot.docs) {
    const student = docSnap.data();

    if (student.role === "student" && !student.passwordSent) {
      const userRecord = auth.currentUser;
      if (!userRecord) continue;

      if (userRecord.emailVerified && userRecord.email === student.studentEmail) {
        try {
          await sendPasswordEmail(student.studentEmail, student.password);
          await updateDoc(doc(firestore, "users", docSnap.id), { passwordSent: true });
          console.log(`✅ Password sent to ${student.studentEmail}`);
        } catch (error) {
          console.error(`Error processing ${student.studentEmail}:`, error);
        }
      }
    }
  }
};

// 🎯 NEW: Run every 30 seconds
setInterval(checkVerificationAndSendPassword, 30000); // 30 seconds = 30000ms
