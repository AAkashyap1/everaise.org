import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom' 
import { useAuth } from '../../contexts/AuthContext'
import { database } from '../../firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'

export default function AdminRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(false)
  const user = useDocumentData(database.users.doc(currentUser ? currentUser.email : 'tst'))[0];
  
  useEffect(() => {
    if (user) {
      setAdmin(user.admin || user.instructor);
      setLoading(false);
    } else if (!currentUser) {
      setAdmin(false);
      setLoading(false);
    }
  }, [user, currentUser])

  return (
    loading ? 
      <div>Authenticating...</div> : 
      <Route
        {...rest}
        render={props => {
          return admin ? <Component {...props} /> : <Redirect to="/landing" />
        }} 
      ></Route>
  )
};