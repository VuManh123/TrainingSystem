// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import NavbarLogin from '../dashboard/NavbarLogin'
import RegisterForm from '../authentation/RegisterForm';
import { ThemeContext } from '../ThemeContext';

const Register = () => {
  const {theme} = useContext(ThemeContext);
  
    return (
      <div className={`container ${theme}`}>
        <NavbarLogin/>
        <RegisterForm id='register-form' />
      </div>
    )
}

export default Register
