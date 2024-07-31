// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'

const Teacher = () => {
    const current_theme = localStorage.getItem('current_theme');
    const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
    useEffect(() => {
        localStorage.setItem('current_theme', theme);
    },[theme])

  return (
    <div>
      <Sidebar theme={theme} setTheme={setTheme}/>
    </div>
  )
}

export default Teacher
