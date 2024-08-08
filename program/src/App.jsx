// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teacher from './components/pages/Teacher';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { ThemeProvider } from './components/ThemeContext';
import { ToastContainer } from 'react-toastify';
import Student from './components/pages/Student';
import AdminAM from './components/pages/AdminAM';
import AdminSM from './components/pages/AdminSM';
import DetailGeneral from './components/pages/DetailGeneral';

function App() {
  return (
    <ThemeProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<Student />} />
          <Route path="/adminAM" element={<AdminAM />} />
          <Route path="/adminSM" element={<AdminSM />} />
          <Route path="/course-details/:ID" element={<DetailGeneral/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
