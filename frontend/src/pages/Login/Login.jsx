import React, { useContext, useRef } from 'react';
import "./Login.css";
import { AuthContext } from '../../context/AuthContext';
import { loginCall } from '../../apiCalls';

const Login = () => {

    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
      
        try {
          await loginCall({ email: emailValue, password: passwordValue }, dispatch);
      
          console.log('Login successful');
        } catch (error) {
          console.error('Login error:', error);
        }
      };

  return (
    <div className="login">
    <div className="loginWrapper">
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="Email"
            type="email"
            required
            className="loginInput"
            ref={email}
          />
          <input
            placeholder="Password"
            type="password"
            required
            // minLength="6"
            className="loginInput"
            ref={password}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
          Login
          </button>
          <span className="loginForgot">Forgot Password?</span>
          <button className="loginRegisterButton">
            create a new account
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login