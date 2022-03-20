import React from 'react';
import { Route, Redirect } from 'react-router-dom' 
import { useAuth } from '../../contexts/AuthContext.js'

export default function ProfileRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Redirect to="/update" /> : <Component {...props} />
      }}
    ></Route>
  )
};