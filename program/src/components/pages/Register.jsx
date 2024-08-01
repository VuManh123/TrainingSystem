// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import NavbarLogin from '../navbar/NavbarLogin'
import RegisterForm from '../authentation/RegisterForm';

const Register = () => {
    const current_theme = localStorage.getItem('current_theme');
    const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
    useEffect(() => {
      localStorage.setItem('current_theme', theme);
    },[theme])
  
    return (
      <div className={`container ${theme}`}>
        <NavbarLogin theme={theme} setTheme={setTheme}/>
        <RegisterForm id='register-form' />
      </div>
    )
}

export default Register
