// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import {OpenAIFilled} from '@ant-design/icons'
import {FaUser, FaLock} from "react-icons/fa"
import styles from './Auth.module.css'
import { ThemeContext } from '../ThemeContext'

const RegisterForm = () => {
    const { theme } = useContext(ThemeContext);
    const [role, setRole] = useState('');

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Xử lý đăng nhập ở đây
      console.log('Role:', role);
    };

  return (
    <div className={`${styles.wrapper} ${theme === 'dark' ? styles.dark : ''}`}>
      <form action=''>
            <div className={styles.logoGpt}>
                <div className={styles.logoIcon}>
                    <OpenAIFilled />
                </div>
            </div>
            <h1>Welcome!</h1>
            <div className={styles.roleOptions}>
                <li>Select role: </li>
                <label>
                    <input
                    type="radio"
                    value="student"
                    checked={role === 'student'}
                    onChange={handleRoleChange}
                    required
                    />
                    Student
                </label>
                <label>
                    <input
                    type="radio"
                    value="teacher"
                    checked={role === 'teacher'}
                    onChange={handleRoleChange}
                    />
                    Teacher
                </label>
                <label>
                    <input
                    type="radio"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={handleRoleChange}
                    />
                    Admin
                </label>
            </div>

            <div className={styles.input_row}>
                    <div className={styles.input_box_half}>
                        <input type='text' placeholder='Employee ID ...' required />
                        <FaUser className={styles.icon_Login} />
                    </div>
                    <div className={styles.input_box_half}>
                        <input type='text' placeholder='User name ...' required />
                        <FaLock className={styles.icon_Login} />
                    </div>
                </div>
                <div className={styles.input_row}>
                    <div className={styles.input_box_half}>
                        <input type='text' placeholder='Email ...' required />
                        <FaLock className={styles.icon_Login} />
                    </div>
                    <div className={styles.input_box_half}>
                        <input type='text' placeholder='Phone ...' required />
                        <FaLock className={styles.icon_Login} />
                    </div>
                </div>
                <div className={styles.input_row}>
                    <div className={styles.input_box_half}>
                        <input type='text' placeholder='Address ...' required />
                        <FaLock className={styles.icon_Login} />
                    </div>
                    <div className={styles.input_box_half}>
                        <input type='text' placeholder='Password ...' required />
                        <FaLock className={styles.icon_Login} />
                    </div>
                </div>

            <button style={{ marginTop: '30px' }} type='submit' onClick={handleSubmit}>Register</button>
      </form>
    </div>
  )
}

export default RegisterForm
