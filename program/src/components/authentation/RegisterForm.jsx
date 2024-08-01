// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import {OpenAIFilled} from '@ant-design/icons'
import {FaUser, FaLock} from "react-icons/fa"
import styles from './Auth.module.css'

const RegisterForm = () => {
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
    <div className={styles.wrapper}>
      <form action=''>
            <div className='logoGpt'>
                <div className='logo-icon'>
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

            <div className={styles.input_box}>
                <input type='text' placeholder='User name ...' required />
                <FaUser className={styles.icon_Login} />
            </div>
            <div className={styles.input_box}>
                <input type='text' placeholder='User name ...' required />
                <FaLock className={styles.icon_Login} />
            </div>
            <div className={styles.input_box}>
                <input type='text' placeholder='User name ...' required />
                <FaLock className={styles.icon_Login} />
            </div>
            <div className={styles.input_box}>
                <input type='text' placeholder='User name ...' required />
                <FaLock className={styles.icon_Login} />
            </div>
            <div className={styles.input_box}>
                <input type='text' placeholder='User name ...' required />
                <FaLock className={styles.icon_Login} />
            </div>
            <div className={styles.input_box}>
                <input type='text' placeholder='User name ...' required />
                <FaLock className={styles.icon_Login} />
            </div>

            <button type='submit' onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default RegisterForm
