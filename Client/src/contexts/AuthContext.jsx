import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* A function that is called when the user logs in or out. */
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * This function takes two arguments, email and password, and returns the result of calling the
   * signInWithEmailAndPassword function with the auth object, email and password as arguments.
   * @returns The function signInWithEmailAndPassword is being returned.
   */
  const login = (email, password) => {
    // firebase auth
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* Setting the user to null and then signing out. */
  const logout = async () => {
    setUser(null);
    // firebase function
    await signOut(auth);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
