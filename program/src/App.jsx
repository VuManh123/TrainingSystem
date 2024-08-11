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
import NotFound from './components/authentation/NotFound';
import ChapterContent from './components/learning_course/ChapterContent';
import Learning from './components/pages/Learning';
import Videos_Learning from './components/pages/student/Videos_Learning';
import Document_Learning from './components/pages/student/Document_Learning';
import QuizChapter from './components/pages/student/QuizChapter';

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
          <Route path="/student/:userID" element={<Student />} />
          <Route path="/adminAM" element={<AdminAM />} />
          <Route path="/adminSM" element={<AdminSM />} />
          <Route path="/course-details/:ID" element={<DetailGeneral/>} />
          <Route path='/pagenotfound' element = {<NotFound />} />
          <Route path='/learning-course/:userID/:ID' element={<Learning/>} />
          <Route path='/learning-course/:userID/:ID/details' element={<ChapterContent/>} />
          <Route path='/learning-course/:userID/:ID/:chapterID/videos'element={<Videos_Learning />} />
          <Route path='/learning-course/:userID/:ID/:chapterID/document'element={<Document_Learning />} />
          <Route path='/learning-course/:userID/:ID/:chapterID/testfinalchapter'element={<QuizChapter />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
