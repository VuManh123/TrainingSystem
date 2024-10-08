// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Card, Row, Col, Spin, Typography, Button, Menu } from 'antd';
import './CourseDetail.css';
import { ThemeContext } from '../../ThemeContext';

const { Content } = Layout;
const { Title, Text } = Typography;

const CourseDetail = () => {
  const {theme} = useContext(ThemeContext);
  const { ID } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const numericID = Number(ID);
        if (isNaN(numericID)) {
          throw new Error('Invalid course ID');
        }
  
        const response = await fetch(`http://localhost:3000/api/course/${numericID}`);
        
        const contentType = response.headers.get('content-type');
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('Expected JSON response');
        }
  
        const data = await response.json();
        
        // Trực tiếp set dữ liệu JSON trả về vào state
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourseDetail();
  }, [ID]);

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  if (error) {
    return <div>{`Error loading course details: ${error}`}</div>;
  }

  if (!course) {
    return <div>No course details available</div>;
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout className={`course-detail-layout ${theme === 'dark' ? 'darkBody' : ''}`}>
      <Content className="course-detail-content">
        <div className="course-header">
          <Title level={1} className="course-title" style={{ backgroundImage: `url(/${course.Image})`, color: '#fff' }}>{course.Title}</Title>
          <Text className="course-short-description">
            Khóa học thuộc một số các hoạt động của công ty Sews Components VietNam. Nhằm nâng cao hiểu biết về tập đoàn, các quy định, quy chế của tập đoàn.
            Nâng cao kiến thưc cho nhân viên thuộc công ty về công việc và đời sống. Hãy cùng pass những khóa học cùng với hệ thống Đào Tạo SEWS-CV nhé. Thanks!
          </Text>
          <div className="course-dates">
            <Text className="course-date"><strong>Lịch học: </strong> {new Date(course.StartDate).toLocaleDateString()} - {new Date(course.EndDate).toLocaleDateString()}</Text>
          </div>
          <Button type="primary" className="enroll-button">Đăng ký học ngay</Button>
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={['introduction']}>
          <Menu.Item key="introduction" onClick={() => scrollToSection('introduction')}>Giới thiệu</Menu.Item>
          <Menu.Item key="content" onClick={() => scrollToSection('content')}>Nội dung khóa học</Menu.Item>
          <Menu.Item key="instructor" onClick={() => scrollToSection('instructor')}>Giảng viên</Menu.Item>
          <Menu.Item key="curriculum" onClick={() => scrollToSection('curriculum')}>Chương trình đào tạo</Menu.Item>
        </Menu>
        <Row gutter={[16, 16]} className="course-detail-info">
          <Col span={24} id="introduction">
            <Card title="Giới thiệu về khóa học">
              <div dangerouslySetInnerHTML={{ __html: course.Description }} />
              <img src={`/${course.Image}`}></img>
            </Card>
          </Col>
          <Col span={24} id="content">
            <Card title="Nội dung khóa học">
              <ul className='chapter-list'>
                
                {course.Chapters && course.Chapters.length > 0 ? (
                  course.Chapters.map((chapter, index) => (
                    <li key={index} className="chapter-items">{chapter.ChapterTitle}</li>
                  ))
                ) : (
                <Text>Chưa có chương nào cho khóa học này.</Text>
                )}
              </ul>
            </Card>
          </Col>
          <Col span={24} id="instructor">
            <Card title="Giảng viên">
              <Text>{course.Name} - Chức vụ: {course.Rank} - Bộ phận: {course.WorkUnit}  <br/></Text>
              <Text>Email: {course.Email}</Text>
            </Card>
          </Col>
          <Col span={24} id="curriculum">
            <Card title="Chương trình đào tạo">
              <Text>Bắt đầu: { new Date(course.StartDate).toLocaleDateString()} - Kết thúc: {new Date(course.EndDate).toLocaleDateString()}</Text>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CourseDetail;
