// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import {OpenAIFilled} from '@ant-design/icons'
import {FaUser, FaLock, FaRegCreditCard, FaMailBulk, FaPhoneAlt, FaAddressBook, FaHackerrank, FaTasks} from "react-icons/fa"
import styles from './Auth.module.css'
import { ThemeContext } from '../ThemeContext'
import { useNavigate } from 'react-router-dom';
import { notify } from '../notification/Notification';

const RegisterForm = () => {
    const { theme } = useContext(ThemeContext);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employeeId: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        code: '',
        rank: '',
        workUnit: ''
    });

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, role }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Registration successful:', result);
            notify('Registration successful with role ' + role + '!', 'success');
            // Redirect to login or another page
            navigate('/login')
        } else {
            //const errorText = await response.text();
            notify('Please check your infomation!', 'error');
        }
        } catch (error) {
            notify('Please check again', 'error');
        }
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

            {role === 'student' && (
          <>
            <div className={styles.input_row}>
              <div className={styles.input_box_half}>
                <input
                  type='text'
                  name='employeeId'
                  placeholder='Employee ID ...'
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />
                <FaRegCreditCard className={styles.icon_Login} />
              </div>
              <div className={styles.input_box_half}>
                <input
                  type='text'
                  name='username'
                  placeholder='User name ...'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <FaUser className={styles.icon_Login} />
              </div>
            </div>
            <div className={styles.input_row}>
              <div className={styles.input_box_half}>
                <input
                  type='email'
                  name='email'
                  placeholder='Email ...'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FaMailBulk className={styles.icon_Login} />
              </div>
              <div className={styles.input_box_half}>
                <input
                  type='text'
                  name='phone'
                  placeholder='Phone ...'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <FaPhoneAlt className={styles.icon_Login} />
              </div>
            </div>
            <div className={styles.input_row}>
              <div className={styles.input_box_half}>
                <input
                  type='text'
                  name='address'
                  placeholder='Address ...'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <FaAddressBook className={styles.icon_Login} />
              </div>
              <div className={styles.input_box_half}>
                <input
                  type='password'
                  name='password'
                  placeholder='Password ...'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <FaLock className={styles.icon_Login} />
              </div>
            </div>
          </>
        )}

        {(role === 'teacher' || role === 'admin') && (
          <>
            <div className={styles.input_row}>
              <div className={styles.input_box_half}>
                <input
                  type='text'
                  name='code'
                  placeholder='Employee ID ...'
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
                <FaRegCreditCard className={styles.icon_Login} />
              </div>
              <div className={styles.input_box_half}>
                <input
                  type='text'
                  name='username'
                  placeholder='User name ...'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <FaUser className={styles.icon_Login} />
              </div>
            </div>
            <div className={styles.input_row}>
              <div className={styles.input_box_half}>
                <input
                  type='email'
                  name='email'
                  placeholder='Email ...'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FaMailBulk className={styles.icon_Login} />
              </div>
              <div className={styles.input_box_half}>
                <input
                  type='text'
                  name='password'
                  placeholder='Password ...'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <FaLock className={styles.icon_Login} />
              </div>
            </div>
            {role === 'teacher' && (
              <div className={styles.input_row}>
                <div className={styles.input_box_half}>
                  <input
                    type='text'
                    name='rank'
                    placeholder='Rank ...'
                    value={formData.rank}
                    onChange={handleChange}
                    required
                  />
                  <FaHackerrank className={styles.icon_Login} />
                </div>
                <div className={styles.input_box_half}>
                  <input
                    type='text'
                    name='workUnit'
                    placeholder='Work Unit ...'
                    value={formData.workUnit}
                    onChange={handleChange}
                    required
                  />
                  <FaTasks className={styles.icon_Login} />
                </div>
              </div>
            )}
          </>
        )}

            <button style={{ marginTop: '30px' }} type='submit' onClick={handleSubmit}>Register</button>
      </form>
    </div>
  )
}

export default RegisterForm
