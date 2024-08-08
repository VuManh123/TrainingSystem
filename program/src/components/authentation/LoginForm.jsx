// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { OpenAIFilled } from '@ant-design/icons';
import { FaUser, FaLock } from "react-icons/fa";
import styles from './Auth.module.css';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';
import { notify } from '../notification/Notification';

const LoginForm = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(role);
    console.log(email);
    console.log(password);

    if (!role || !email || !password) {
      //setError('All fields are required');
      notify('Please fill all fields of infomation', 'error')
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
  
      if (response.ok) {
        const data = await response.json();
        notify('Login successful!', 'success');
  
        const userID = data.user.id;  // Extract the user ID from the response
  
        // Redirect to the appropriate page based on the role
        if (role === 'teacher') {
          navigate('/teacher');
        } else if (role === 'admin') {
          navigate('/adminAM');
        } else {
          navigate(`/student/${userID}`);  // Include the user ID in the URL for students
        }
      } else {
        const errorText = await response.text();
        notify(errorText, 'error');
      }
    } catch (error) {
      notify('Error during login: ' + error, 'error');
    }
  };

  return (
    <div className={`${styles.wrapper} ${theme === 'dark' ? styles.dark : ''}`}>
      <form onSubmit={handleSubmit}>
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

        <div className={styles.input_box}>
          <input
            type='text'
            placeholder='Email ...'
            value={email}
            onChange={handleEmailChange}
            required
          />
          <FaUser className={styles.icon_Login} />
        </div>
        <div className={styles.input_box}>
          <input
            type='password'
            placeholder='Password ...'
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <FaLock className={styles.icon_Login} />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.remember_forgot}>
          <label><input type='checkbox' />Remember me</label>
          <a href='#'>Forgot password?</a>
        </div>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
