import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ProfileRoute from './components/ProfileRoute';
import AdminRoute from './components/AdminRoute';
import reportWebVitals from './reportWebVitals';
import Admin from './pages/admin';
import AdminCourses from './pages/admin-courses';
import CreateAssignment from './pages/create-assignment'
import Landing from './pages/landing';
import Team from './pages/team';
import Contact from './pages/contact';
import SignIn1 from './pages/sign-in-student';
import Enroll from './pages/enroll';
import Profile from './pages/profile';
import Update from './pages/update';
import Home from './pages/home';
import Homework from './pages/homework';
import Dashboard from './pages/dashboard';
import Guest from './pages/guest';
import Estimathon from './pages/estimathon';
import Resources from './pages/resources';
import Courses from './pages/courses';
import NotFound from './pages/404';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/landing">
            <Redirect to="/"></Redirect>
          </Route>
          <Route exact path="/" component={Landing} />
          <Route path="/people/team" component={Team} />
          <Route path="/contact" component={Contact} />
          <Route path="/events/contests/estimathon" component={Estimathon} />
          <Route path="/courses" component={Courses} />
          <Route path="/events/guest-speakers" component={Guest} />
          <Route path="/sign-in-student" component={SignIn1} />
          <Route path="/resources" component={Resources} />
          <ProfileRoute path="/profile" component={Profile} />
          <PrivateRoute path="/update" component={Update} />
          <PrivateRoute path="/enroll" component={Enroll} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/dashboard/:course" component={Dashboard} />
          <PrivateRoute exact path="/homework/:course/:module/:assignmentId" component={Homework} />
          <AdminRoute path="/admin-courses" component={AdminCourses} />
          <AdminRoute exact path="/admin/:course" component={Admin} />
          <AdminRoute exact path="/admin/:course/homework/:assignmentId" component={CreateAssignment} />
          <Route path="*" component={NotFound} />
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