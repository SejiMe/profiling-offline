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
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* A function that is called when the user logs in or out. */
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      /* This is checking if the user is logged in and if the token is null. If the user is logged in
      and the token is null, then the user is set to the user object. If the user is not logged in
      or the token is not null, then the session storage is cleared and the user is set to null. */
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        if (sessionStorage.getItem('Token') == null)
          sessionStorage.setItem('Token', user.uid);
      } else {
        sessionStorage.clear();
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
    sessionStorage.clear();
    // firebase function
    await signOut(auth);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
