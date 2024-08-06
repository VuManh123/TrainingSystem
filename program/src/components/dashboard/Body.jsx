import React from 'react';
import { Layout, Row, Col, Carousel, Card, Button } from 'antd';
import './Body.css';

// Import images
import banner1 from '../../images/banner1.png';
import banner2 from '../../images/banner2.png';
import banner3 from '../../images/banner3.png';
//import course4 from '../images/course4.jpg';

const { Content } = Layout;

const courseData = [
  {
    id: 1,
    title: "Hệ nhúng",
    code: "IT4210",
    startDate: "27/09/2021",
    image: banner1
  },
  {
    id: 2,
    title: "Hệ nhúng",
    code: "IT4470",
    startDate: "27/09/2021",
    image: banner3
  },
  {
    id: 3,
    title: "Linux cho hệ nhúng",
    code: "IT4946",
    startDate: "27/09/2021",
    image: banner2
  },
  {
    id: 4,
    title: "Cơ sở dữ liệu",
    code: "IT3292",
    startDate: "01/01/2022",
    image: banner1
  }
];

const App = () => {
  return (
    <Layout className="layout">
      <Content>
        <div className="site-layout-content">
          <Slider />
          <CourseList courses={courseData} />
        </div>
      </Content>
    </Layout>
  );
};

const Slider = () => (
  <Carousel autoplay>
    <div>
      <div className="slide-content" style={{ backgroundImage: `url(${banner1})` }}>
        <h2>Hệ nhúng</h2>
        <Button type="primary" size="large">Tham gia học ngay</Button>
        <p>284 người đã đăng ký</p>
      </div>
    </div>
    <div>
      <div className="slide-content" style={{ backgroundImage: `url(${banner2})` }}>
        <h2>Trí tuệ nhân tạo</h2>
        <Button type="primary" size="large">Tham gia học ngay</Button>
        <p>284 người đã đăng ký</p>
      </div>
    </div>
    <div>
      <div className="slide-content" style={{ backgroundImage: `url(${banner3})` }}>
        <h2>Hệ mật</h2>
        <Button type="primary" size="large">Tham gia học ngay</Button>
        <p>284 người đã đăng ký</p>
      </div>
    </div>
    {/* Add more slides as needed */}
  </Carousel>
);

const CourseList = ({ courses }) => (
  <Row gutter={16} style={{ marginTop: '20px' }}>
    {courses.map(course => (
      <Col span={6} key={course.id}>
        <div className="course-card-wrapper">
          <Card
            hoverable
            cover={<img alt={course.title} src={course.image} />}
          >
            <Card.Meta title={course.title} description={`${course.code} - Bắt đầu: ${course.startDate}`} />
          </Card>
          <div className="course-overlay">
            <Button type="primary">Tìm hiểu thêm</Button>
          </div>
        </div>
      </Col>
    ))}
  </Row>
);

export default App;
