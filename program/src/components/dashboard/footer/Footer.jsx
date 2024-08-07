// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import './Footer.css';
import { ThemeContext } from '../../ThemeContext';

const center = {
  lat: 20.913656421119533, // SEWS-CV
  lng: 106.06961508038194 // SEWS-CV 
};

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <footer className={`footer ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="footer-content">
        <div className="footer-info">
          <h3>Hệ thống Đào tạo SEWS-CV</h3>
          <p>
              <EnvironmentOutlined /> Địa chỉ: Khu công nghiệp thăng long II, Yên Mỹ, Hưng Yên
              <br />
              <PhoneOutlined /> Điện thoại: (84) 368395527
              <br />
              <MailOutlined /> Email: manh.vd215282@sis.hust.edu.vn
            </p>
        </div>
        <div className="footer-map">
          <MapContainer
            center={center}
            zoom={15}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center}>
              <Popup>
                Hệ thống Đào tạo SEWS-CV<br />
                Khu công nghiệp thăng long II, Yên Mỹ, Hưng Yên
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Hệ thống Đào tạo SEWS-CV. Bản quyền thuộc về SEWS-CV.</p>
      </div>
    </footer>
  );
};

export default Footer;
