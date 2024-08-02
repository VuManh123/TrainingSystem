// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import NavbarLogin from '../navbar/NavbarLogin'
import LoginForm from '../authentation/LoginForm';
import { ThemeContext } from '../ThemeContext';

const Login = () => {
    const {theme} = useContext(ThemeContext);
  
    return (
      <div className={`container ${theme}`}>
        <NavbarLogin/>
        <LoginForm id='login-form'/>
      </div>
    )
}

export default Login
