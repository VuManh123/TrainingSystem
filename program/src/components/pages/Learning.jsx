// eslint-disable-next-line no-unused-vars
import React from 'react'
import CourseOutline from '../learning_course/CourseOutline'
import Footer from '../dashboard/footer/Footer'
import NavbarLogin from '../dashboard/navbar/NavbarLogin'

const Learning = () => {
  return (
    <div>
      <NavbarLogin />
      <CourseOutline />
      <Footer />
    </div>
  )
}

export default Learning
