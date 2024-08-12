// eslint-disable-next-line no-unused-vars
import {useContext} from 'react'
import './Navbar.css'
import logo_light from '../../../assets/logo-black.png'
import logo_dark from '../../../assets/logo-white.png'  
import toggle_light from '../../../assets/night.png'
import toggle_dark from '../../../assets/day.png'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';
import search_icon_light from '../../../assets/search-w.png'
import search_icon_dark from '../../../assets/search-b.png'

// eslint-disable-next-line react/prop-types
const NavbarStudent = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);  
    const navigate = useNavigate();

    const handleLoginLogo = () => {
      navigate(-1); // Quay về trang trước
  };

  return (
    <div className={`navbar ${theme === 'dark' ? 'darkNavbar' : ''}`}>
      <img src={theme == 'light' ? logo_light : logo_dark} alt='' onClick={handleLoginLogo} className='logo'></img>

      <div className='search-box'>
        <input type='text' placeholder='Tìm kiếm khóa học ...'></input>
        <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt='' />
      </div>

      <img onClick={toggleTheme} src={theme == 'light' ? toggle_light : toggle_dark} alt='' className='toggle-icon' />
    </div>
  )
}

export default NavbarStudent
