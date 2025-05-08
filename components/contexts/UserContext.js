
import React, { createContext, useState, useEffect } from "react";
import { auth, firestore } from "../backend/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('');
  const [student, setStudent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        if (email === 'darthzcellen@gmail.com') {
          setUserRole('admin');
          setIsAuthenticated(true);
        } else {
          const userDocRef = doc(firestore, "users", email);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserRole('student');
            setStudent(userDoc.data());
            setIsAuthenticated(true);
          } else {
            console.log("⚠️ No student data found for", email);
            setIsAuthenticated(false);
          }
        }
      } else {
        setIsAuthenticated(false);
        setUserRole('');
        setStudent(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userRole, setUserRole, student, setStudent, isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </UserContext.Provider>
  );
};
