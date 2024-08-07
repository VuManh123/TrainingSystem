/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { Layout, Row, Col, Carousel, Card, Button } from 'antd';
import './Body.css';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const App = () => {
  const { theme } = useContext(ThemeContext);
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();

  const handleDetailClick = (ID) => {
    navigate(`/course-details/${ID}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/courses');
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
          <Slider theme={theme} />
          <CourseList courses={courseData} theme={theme} onDetailClick={handleDetailClick} />
        </div>
      </Content>
    </Layout>
  );
};

// eslint-disable-next-line react/prop-types
const Slider = ({ theme }) => (
  <Carousel autoplay>
    <div>
      <div className={`slide-content ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ backgroundImage: `url(/images/banner1.png)` }}>
        <h2>Hệ nhúng</h2>
        <Button type="primary" size="large">Tham gia học ngay</Button>
        <p>284 người đã đăng ký</p>
      </div>
    </div>
    <div>
      <div className={`slide-content ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ backgroundImage: `url(/images/banner2.png)` }}>
        <h2>Trí tuệ nhân tạo</h2>
        <Button type="primary" size="large">Tham gia học ngay</Button>
        <p>284 người đã đăng ký</p>
      </div>
    </div>
    <div>
      <div className={`slide-content ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ backgroundImage: `url(/images/banner3.png)` }}>
        <h2>Hệ mật</h2>
        <Button type="primary" size="large">Tham gia học ngay</Button>
        <p>284 người đã đăng ký</p>
      </div>
    </div>
  </Carousel>
);

// eslint-disable-next-line react/prop-types
const CourseList = ({ courses, theme, onDetailClick }) => (
  <Row gutter={16} style={{ marginTop: '20px' }}>
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
              <Button type="primary" onClick={() => onDetailClick(course.ID)}>Tìm hiểu thêm</Button>
          </div>
        </div>
      </Col>
    ))}
  </Row>
);



export default App;
