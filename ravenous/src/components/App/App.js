import React from 'react';
import './App.css';

import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Navigation from'../Navigation/Navigation';
import Footer from '../Footer/Footer';
import {Route,Routes} from "react-router-dom";
import HomePage from '../Pages/HomePage';
import PageNotFound from '../Pages/PageNotFound';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import { useState, useEffect } from 'react';
import Protected from '../../util/Protected';
import Account from '../Account/Account';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import AppLoader from '../../util/loaders/AppLoader';


const App = () => {
  // getting auth state from redux store
  const { loaded } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) {
      const user = JSON.parse(localStorage.getItem('user'));
      setTimeout(() => {
        dispatch(login({
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          avatar: ''
        }))
      }, 2000)
    }
  })

  return (
    <div className="App">
      {!loaded && <AppLoader />}
      <Navigation />
      <h1 style={{ margin: 0 }}>ravenous</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Account />
            </Protected>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
