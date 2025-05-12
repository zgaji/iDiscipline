// UserContext.js (Using Native WebSocket in Expo)
import React, { createContext, useState, useEffect } from "react";
import supabase from "../backend/supabaseClient";

export const UserContext = createContext();
let socket; // Declare WebSocket globally

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('');
  const [student, setStudent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]); // ✅ Messages for chat

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const email = session.user.email;
        const { data: profile } = await supabase.from('students').select('*').eq('studentEmail', email).single();

        if (profile) {
          if (profile.roles === 'admin') {
            setUserRole('admin');
            setIsAuthenticated(true);
          } else if (profile.roles === 'student') {
            setUserRole('student');
            setStudent(profile);
            setIsAuthenticated(true);
          }
        }
      } else {
        setIsAuthenticated(false);
        setUserRole('');
        setStudent(null);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // // ✅ Initialize Native WebSocket Connection
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     socket = new WebSocket('ws://localhost:3000'); // Use your WebSocket URL (Secure)
      
  //     socket.onopen = () => {
  //       console.log("✅ WebSocket connection established");
  //     };

  //     socket.onmessage = (event) => {
  //       const message = JSON.parse(event.data);
  //       console.log("📩 New Message:", message);
  //       setMessages((prev) => [...prev, message]);
  //     };

  //     socket.onerror = (error) => {
  //       console.error("❌ WebSocket Error:", error.message);
  //     };

  //     socket.onclose = () => {
  //       console.log("🔌 WebSocket connection closed");
  //     };

  //     return () => {
  //       socket.close(); // Clean up on component unmount
  //     };
  //   }
  // }, [isAuthenticated]);

  // ✅ Send Message Function (Globally Available)
  const sendMessage = (content) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageData = {
        sender: userRole === 'admin' ? 'Disciplinary Officer' : student?.studentEmail,
        content,
        timestamp: new Date().toISOString()
      };
      socket.send(JSON.stringify(messageData));
    }
  };

  return (
    <UserContext.Provider value={{
      userRole,
      setUserRole,
      student,
      setStudent,
      isAuthenticated,
      setIsAuthenticated,
      loading,
      messages,
      sendMessage // ✅ Expose sendMessage function
    }}>
      {children}
    </UserContext.Provider>
  );
};
