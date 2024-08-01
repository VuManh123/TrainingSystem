// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'

const Teacher = () => {
    const current_theme = localStorage.getItem('current_theme');
    const [theme1, setTheme] = useState(current_theme ? current_theme : 'light');
    useEffect(() => {
        localStorage.setItem('current_theme', theme1);
    },[theme1])

  return (
    <div>
      <Sidebar theme1={theme1} setTheme={setTheme}/>
    </div>
  )
}

export default Teacher
