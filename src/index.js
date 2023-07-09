import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/routes/PrivateRoute';
import ProfileRoute from './components/routes/ProfileRoute';
import CourseRoute from './components/routes/CourseRoute';
import AdminRoute from './components/admin/AdminRoute';
import reportWebVitals from './reportWebVitals';
import AdminDashboard from './pages/admin/dashboard';
import AdminHome from './pages/admin/home';
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
import Course from './pages/course';
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
          <Route exact path="/course/:course" component={Course} />
          <Route path="/events/guest-speakers" component={Guest} />
          <Route path="/sign-in-student" component={SignIn1} />
          <Route path="/resources" component={Resources} />
          <ProfileRoute path="/profile" component={Profile} />
          <PrivateRoute path="/update" component={Update} />
          <PrivateRoute path="/enroll" component={Enroll} />
          <Route path="/home">
            <Redirect to="/launch"></Redirect>
          </Route>
          <PrivateRoute path="/launch" component={Home} />
          <CourseRoute exact path="/dashboard/:course" component={Dashboard} />
          <CourseRoute
            exact
            path="/homework/:course/:module/:assignmentId"
            component={Homework}
          />
          <AdminRoute path="/admin/home" component={AdminHome} />
          <AdminRoute
            exact
            path="/admin/dashboard/:course"
            component={AdminDashboard}
          />
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
