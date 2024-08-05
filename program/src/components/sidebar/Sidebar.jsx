// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { Button, Layout, Menu } from 'antd';
import { OpenAIFilled, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, AuditOutlined, ProductOutlined, FormOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { ThemeContext } from '../ThemeContext';
import styles from './Sidebar.module.css';
import { BodyHome } from '../admin/home';

const { Sider, Header } = Layout;

const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: 'student',
    icon: <AuditOutlined />,
    label: 'Student',
  },
  {
    key: 'course',
    icon: <ProductOutlined />,
    label: 'Course',
    children: [
      {
        key: 'listcourse',
        label: 'List Course',
      },
      {
        key: 'addcourse',
        label: 'Add Course',
      },
    ],
  },
  {
    key: 'quiz',
    icon: <FormOutlined />,
    label: 'Quiz',
    children: [
      {
        key: 'listquiz',
        label: 'List Quiz',
      },
      {
        key: 'addquiz',
        label: 'Add Quiz',
      },
    ],
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
  {
    key: 'analysis',
    icon: <LineChartOutlined />,
    label: 'Analysis',
  },
];

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout>
        <Sider className={`${styles.sidebar} ${theme === 'dark' ? styles.dark : ''}`} collapsed={collapsed} collapsible trigger={null}>
          <div className={styles.logoGpt}>
            <div className={styles.logoIcon}>
              <OpenAIFilled />
            </div>
          </div>

          <Menu theme={theme} className={styles.menu} mode="inline" items={menuItems} />

          <div className={styles.toggleBtn}>
            <Button onClick={toggleTheme}>
              {theme === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
            </Button>
          </div>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }}>
            <Button 
              type="text" 
              className={styles.toggle} 
              onClick={() => setCollapsed(!collapsed)} 
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
            />
          </Header>
          {/* Trang Home */}
          <BodyHome />
          {/*  */}
        </Layout>
      </Layout>
    </div>
  );
};

export default Sidebar;
