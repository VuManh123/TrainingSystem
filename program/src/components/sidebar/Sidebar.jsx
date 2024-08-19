// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from 'react';
import { Button, ConfigProvider, Layout, Menu } from 'antd';
import { OpenAIFilled, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, AuditOutlined, ProductOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { ThemeContext } from '../ThemeContext';
import styles from './Sidebar.module.css';
import { Avatar as AntdAvatar } from 'antd';
import { Content } from 'antd/es/layout/layout';
import StudentManagement from '../body_teacher/MStudent';

const { Sider, Header } = Layout;

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);

  // Effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Call handleResize to set initial state based on the current window size
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ConfigProvider theme={{ hashed: false }}>
      <div>
        <Layout>
          <Sider
            className={`${styles.sidebar} ${theme === 'dark' ? styles.dark : ''}`}
            collapsed={collapsed}
            collapsible
            trigger={null}
          >
            <div className={styles.logoGpt}>
              <div className={styles.logoIcon}>
                <OpenAIFilled />
              </div>
            </div>

            <Menu theme={theme} className={styles.menu} mode="inline">
              <Menu.Item key="home" icon={<HomeOutlined className={styles.iconStyle} />} className={styles.menuItem}>
                <div className={styles.menuItemWrapper}>
                  Home
                </div>
              </Menu.Item>
              <Menu.Item key="student" icon={<AuditOutlined />}>
                <div className={styles.menuItemWrapper}>
                  Student
                </div>
              </Menu.Item>
              <Menu.Item key="course" icon={<ProductOutlined />}>
                <div className={styles.menuItemWrapper}>
                  Courses
                </div>
              </Menu.Item>
              <Menu.SubMenu
                key="settings"
                icon={<SettingOutlined />}
                title={<span className={styles.menuItemWrapper}>Settings</span>}
              >
                <Menu.Item key="profile">
                  <div className={styles.menuItemWrapper}>
                    Profile Details
                  </div>
                </Menu.Item>
                <Menu.Item key="changepassword">
                  <div className={styles.menuItemWrapper}>
                    Change Password
                  </div>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="analysis" icon={<LineChartOutlined />}>
                <div className={styles.menuItemWrapper}>
                  Analysis
                </div>
              </Menu.Item>
            </Menu>

            <div className={styles.toggleBtn}>
              <Button onClick={toggleTheme}>
                {theme === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
              </Button>
            </div>
          </Sider>
          <Layout>
            <Header className={`${styles.header} ${theme === 'dark' ? styles.dark : ''}`}>
              <Button
                type="text"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                className={`${styles.button} ${theme === 'dark' ? styles.darkButton : ''}`}
              />
              <AntdAvatar className={`${styles.avatar} ${theme === 'dark' ? styles.dark : ''}`}>
                US
              </AntdAvatar>
            </Header>
            <Content className={styles.content}>
              <StudentManagement /> {/* Sử dụng component mới */}
            </Content>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default Sidebar;
