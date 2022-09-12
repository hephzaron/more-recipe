import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './assets/css/header.css';
import './assets/css/homepage.css';
import './assets/css/user-form.css';
import './assets/css/flash-message.css';
import './assets/css/recipe-form.css';
import './assets/css/modal.css';
import './assets/css/custom-card.css';
import HomePage from './components/pages/HomePage';
import SignupForm from './components/pages/SignupForm';
import LoginForm from './components/pages/LoginForm';
import Header from './components/general/Header';

/**
 * React App
 * @function App
 * @param {null} void
 */

const App = () => (
    <Router>
      <div>
        <Header/>
        <hr/>
        <Routes>
          <Route path="/">
            <Route path="" element={<HomePage/>}/>
            <Route path="saved-recipes" element={<HomePage/>}/>
            <Route path="my-recipes" element={<HomePage/>}/>
            <Route path="register" element={<SignupForm/>}/>
            <Route path="login" element={<LoginForm/>}/>
            <Route path="*"
                  element={
                  <div style={{ padding: "20rem" }}>
                    <p>There's nothing here!</p>
                  </div>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );

export default App;
