import React, { useContext, useState, useEffect } from 'react';
import { Auth } from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return Auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return Auth.signInWithEmailAndPassword(email, password)
  }

  function signout() {
    return Auth.signOut()
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function sendPasswordResetEmail(email) {
    return Auth.sendPasswordResetEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    sendPasswordResetEmail,
    updateEmail, 
    updatePassword,
    login,
    signout,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}