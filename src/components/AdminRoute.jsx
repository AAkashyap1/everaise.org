import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom' 
import { useAuth } from '../contexts/AuthContext.js'
import { database } from '../firebase'

export default function AdminRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  const [admin, setAdmin] = useState(true)
  const [loading, setLoading] = useState(true)

  const FetchData = () => {
    database.users.doc(currentUser.email).get().then((doc) => {
      setAdmin(doc.data().admin)
    }).then(() => {
        setLoading(false)
    })
  }

  useEffect(() => {
    FetchData()
  })

  if (!loading) {
    return (
      <Route
        {...rest}
        render={props => {
          return ((currentUser && admin) ? <Component {...props} /> : <Redirect to="/landing" />)
        }} 
      ></Route>
    )
  } else if (loading) {
    return (
      <div>Loading...</div>
    )
  }
};