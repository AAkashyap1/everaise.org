import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom' 
import { useAuth } from '../../contexts/AuthContext'
import { database } from '../../firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'

export default function CourseRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const course = rest.location.pathname.split('/')[2];
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)
  const user = useDocumentData(database.users.doc(currentUser ? currentUser.email : 'tst'))[0];

  useEffect(() => {
    if (user) {
      for (const tempCourse of user.courses) {
        if (tempCourse.name === course) {
          setVerified(tempCourse.enrolled || user.instructor || user.admin)
          break;
        }
      }
      setLoading(false);
    } else if (!currentUser) {
      setVerified(false);
      setLoading(false);
    }
  }, [user, currentUser, course])

  return (
    loading ? 
      <div>Authenticating...</div> : 
      <Route
        {...rest}
        render={props => {
          return verified ? <Component {...props} /> : <Redirect to="/home" />
        }} 
      ></Route>
  )
};