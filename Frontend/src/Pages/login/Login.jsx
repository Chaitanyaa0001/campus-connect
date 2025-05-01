import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [logindata, setlogindata] = useState({
    email: '',
    password: ''
  });

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setlogindata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(logindata); // Optional: Check your data

    // Clear form
    setlogindata({
      email: '',
      password: ''
    });
  };

  return (
    <div id='Login'>
      <div className="Login-heading">
        <h1>Universe</h1>
        <h4>Your campus connected</h4>
      </div>

      <form onSubmit={SubmitHandler}>
      <h1>Login</h1>
      <h4>Enter your credentials to access your account</h4>
      <p>Email</p>
        <input
          type="text"
          placeholder='Email'
          name="email"
          value={logindata.email}
          onChange={ChangeHandler}
        />

        <p>Password</p>
        <input
          type="password"
          placeholder='Password'
          name="password"
          value={logindata.password}
          onChange={ChangeHandler}
        />

        <button type="submit">Login</button>

        <div className="Login-bottom">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Signup</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
