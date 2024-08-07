// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import './Navbar.css'
import logo_light from '../../../assets/logo-black.png'
import logo_dark from '../../../assets/logo-white.png'
import search_icon_light from '../../../assets/search-w.png'
import search_icon_dark from '../../../assets/search-b.png'
import toggle_light from '../../../assets/night.png'
import toggle_dark from '../../../assets/day.png'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';

// eslint-disable-next-line react/prop-types
const Navbar = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/login');
    };
    const handleRegisterClick = () => {
      navigate('/register')
    }

    const liStyle = {
      margin: '10px 20px'
    };

  return (
    <div className='navbar'>
      <img src={theme == 'light' ? logo_light : logo_dark} alt='' className='logo'></img>
      <ul>
        <li style={liStyle}>Home</li>
        <li style={liStyle}>News</li>
        <li style={liStyle}>Contact</li>
        <li style={liStyle}>About us</li>
      </ul>

      <div className='search-box'>
        <input type='text' placeholder='Searching ...'></input>
        <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt='' />
      </div>

      <button className='register-button' onClick={handleRegisterClick}>Đăng ký</button>
      <button className='login-button' onClick={handleLoginClick}>Đăng nhập</button>

      <img onClick={toggleTheme} src={theme == 'light' ? toggle_light : toggle_dark} alt='' className='toggle-icon' />
    </div>
  )
}

export default Navbar
