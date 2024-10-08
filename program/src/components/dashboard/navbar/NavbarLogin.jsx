// eslint-disable-next-line no-unused-vars
import {useContext} from 'react'
import './Navbar.css'
import logo_light from '../../../assets/logo-black.png'
import logo_dark from '../../../assets/logo-white.png'  
import toggle_light from '../../../assets/night.png'
import toggle_dark from '../../../assets/day.png'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';

// eslint-disable-next-line react/prop-types
const Navbar = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);  
    const navigate = useNavigate();

    const handleLoginLogo = () => {
      navigate(-1); // Quay về trang trước
  };

  return (
      <div className={`navbar ${theme === 'dark' ? 'darkNavbar' : ''}`}>
          <img 
              src={theme === 'light' ? logo_light : logo_dark} 
              alt='logo' 
              onClick={handleLoginLogo} 
              className='logo'
          />
          <img 
              onClick={toggleTheme} 
              src={theme === 'light' ? toggle_light : toggle_dark} 
              alt='toggle theme' 
              className='toggle-icon' 
          />
      </div>
  );
}

export default Navbar
