import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess} from '../../ReduxFeatures/auth/auth.slice';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginHandler } from '../../hooks/google/usegoogle';

const Login = () => {

  const { handleGoogleLoginSuccess } = useGoogleLoginHandler();
  const navigate = useNavigate();
  const dispatch =  useDispatch();
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


  const SubmitHandler =  async (e) => {
    try {
        e.preventDefault();

        const response = await axios.post(`http://localhost:4000/api/auth/login`,
          logindata,
          {withCredentials:true}
        )
        if (response.status === 200){
          dispatch(loginSuccess(response.data))
          console.log("kogin dispatched ",response.data);
          
          navigate('/discussion')

        }
       // Clear form
        setlogindata({
          email: '',
          password: ''
      });
      
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
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
        <div className="google-login">
            <p>or</p>w
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.log("Google login failed")}
            />
        </div>


        <div className="Login-bottom">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Signup</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
