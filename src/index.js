import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ProfileRoute from './components/ProfileRoute';
import reportWebVitals from './reportWebVitals';
import Landing from './pages/landing';
import SignIn1 from './pages/sign-in-student';
import Enroll from './pages/enroll';
import Profile from './pages/profile';
import Update from './pages/update';
import Home from './pages/home'
import Homework from './pages/homework'
import Dashboard from './pages/dashboard'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/landing">
            <Redirect to="/"></Redirect>
          </Route>
          <Route exact path="/" component={Landing} />
          <Route path="/sign-in-student" component={SignIn1} />
          <ProfileRoute path="/profile" component={Profile} />
          <PrivateRoute path="/update" component={Update} />
          <PrivateRoute path="/enroll" component={Enroll} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/dashboard/:course" component={Dashboard} />
          <PrivateRoute exact path="/homework/:course/:module/:assignmentId" component={Homework} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();