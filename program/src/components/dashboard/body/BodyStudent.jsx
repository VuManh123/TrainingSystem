/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import './BodyStudent.css';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate, useParams } from 'react-router-dom';

const { Content } = Layout;

const BodyStudent = () => {
  const { theme } = useContext(ThemeContext);
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();
  const { userID } = useParams();

  const handleDetailClick = (ID, userID) => {
    navigate(`/learning-course/${userID}/${ID}`);
  };
  const numericID = Number(userID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (isNaN(numericID)) {
          throw new Error('Invalid course ID');
        }
        const response = await fetch(`http://localhost:3000/api/coursestudent/${numericID}`);
        const data = await response.json();
        const formattedCourses = data.map(course => ({
          ...course,
          StartDate: course.StartDate.split('T')[0],
          EndDate: course.EndDate.split('T')[0]
        }));
        setCourseData(formattedCourses);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout className={`layout ${theme === 'dark' ? 'dark' : ''}`}>
      <Content>
        <div className="site-layout-content">
          <h2>Khóa học của tôi</h2>
          <CourseList courses={courseData} theme={theme} onDetailClick={handleDetailClick} userID={numericID}/>
        </div>
      </Content>
    </Layout>
  );
};

const CourseList = ({ courses, theme, onDetailClick, userID }) => (
  <Row gutter={[16, 24]} style={{ marginTop: '20px' }}>
    {courses.map(course => (
      <Col xs={24} sm={12} md={8} lg={6} xl={6} key={course.ID}>
        <div className={`course-card-wrapper ${theme === 'dark' ? 'dark-theme' : ''}`}>
          <Card
            hoverable
            cover={<img alt={course.Title} src={`/${course.Image}`} />}
          >
            <Card.Meta title={course.Title} description={`Bắt đầu: ${course.StartDate} - Kết thúc: ${course.EndDate}`} />
          </Card>
          <div className="course-overlay">
            <Button type="primary" onClick={() => onDetailClick(course.ID, userID)}>Xem khóa học</Button>
          </div>
        </div>
      </Col>
    ))}
  </Row>
);

export default BodyStudent;
