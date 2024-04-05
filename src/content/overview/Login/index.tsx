import './index.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithubAlt,
  faGoogle,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login, signUp } from 'src/service/auth.service';
import { log } from 'console';

function Overview() {
  const axios = require('axios');

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/dashboards/Companies');
  };
const handleSignupSubmit =async (event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log(Object.fromEntries(formData.entries()));
  const data = Object.fromEntries(formData.entries());

  const payload = {
    ...data
  }
  const res = await signUp(payload)
 if(!res)
 navigate('/dashboards/Companies');
}
  return (
    <div className={`loginContainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            onSubmit={handleSignupSubmit}
            action="#"
            className="sign-in-form loginForm"
          >
            <h2 className="title">Sign Up</h2>

            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="text"
                name='username'
                placeholder="Username"
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="email"
                name='email'
                placeholder="Email"
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="password"
                name='password'
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn">
              Sign In
            </button>

            <p className="social-text loginp"> Sign in with social platforms</p>
            <div className="social-media">
              <a href="/" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className="my-auto mx-auto" />
              </a>
              <a href="/" className="social-icon">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="my-auto mx-auto"
                />
              </a>
              <a href="/" className="social-icon">
                <FontAwesomeIcon
                  icon={faGithubAlt}
                  className="my-auto mx-auto"
                />
              </a>
            </div>
          </form>
          {/* Signup Form */}
          <form
            action="#"
            className="sign-up-form loginForm"
            onSubmit={handleSignupSubmit}
          >
            <h2 className="title">Create New Account</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="text"
                placeholder="Username"
                name='username'
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="email"
                name='email'
                placeholder="Email"
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="password"
                name='password'
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <p className="social-text loginp">
              Or Sign up with social platforms
            </p>
            <div className="social-media">
              <a href="/" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className="my-auto mx-auto" />
              </a>
              <a href="/" className="social-icon">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="my-auto mx-auto"
                />
              </a>
              <a href="/" className="social-icon">
                <FontAwesomeIcon
                  icon={faGithubAlt}
                  className="my-auto mx-auto"
                />
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className="loginh3">New here?</h3>
            <p className="loginp">
              We're excited to have you join us! Our WYSAX (CRM) software is
              designed to make managing customer relationships easy. It gives
              you tools and insights to connect better with your customers.
              Let's simplify and improve how you do business together!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              New Here!
            </button>
          </div>
          <img src={require('./client.png.png')} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 className="loginh3">One of us ?</h3>
            <p className="loginp">
              If you are an existing user, please click the button below.
            </p>
            <button
              onClick={handleSignInClick}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src="/img/dogLogin.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Overview;
