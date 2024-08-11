import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, HomeOutlined, InfoCircleOutlined, BookOutlined, ContactsOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import './Footer.css';
import { ThemeContext } from '../../ThemeContext';

const center = {
  lat: 20.913656421119533,
  lng: 106.06961508038194,
};

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="footer-top">
        <div className="footer-info">
          <h3>Hệ thống Đào tạo SEWS-CV</h3>
          <p>
            <EnvironmentOutlined /> Địa chỉ: Khu công nghiệp Thăng Long II, Yên Mỹ, Hưng Yên
            <br />
            <PhoneOutlined /> Điện thoại: (84) 0986868686
            <br />
            <MailOutlined /> Email: sews-cv@gmail.com
          </p>
        </div>
        <div className="footer-links">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li><HomeOutlined /> <a href="#home">Trang chủ</a></li>
            <li><InfoCircleOutlined /> <a href="#about">Giới thiệu</a></li>
            <li><BookOutlined /> <a href="#courses">Khóa học</a></li>
            <li><ContactsOutlined /> <a href="#contact">Liên hệ</a></li>
          </ul>
        </div>
        <div className="footer-map">
          <MapContainer
            center={center}
            zoom={15}
            style={{ height: '200px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center}>
              <Popup>
                Hệ thống Đào tạo SEWS-CV<br />
                Khu công nghiệp Thăng Long II, Yên Mỹ, Hưng Yên
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="footer-social">
          <h4>Kết nối với chúng tôi:</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com"><FacebookOutlined /></a>
            <a href="https://www.twitter.com"><TwitterOutlined /></a>
            <a href="https://www.linkedin.com"><LinkedinOutlined /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Hệ thống Đào tạo SEWS-CV. Bản quyền thuộc về SEWS-CV.</p>
      </div>
    </footer>
  );
};

export default Footer;
