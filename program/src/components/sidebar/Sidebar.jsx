// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { Button, ConfigProvider, Layout, Menu } from 'antd';
import { OpenAIFilled, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, AuditOutlined, ProductOutlined, FormOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { ThemeContext } from '../ThemeContext';
import styles from './Sidebar.module.css';
import {Avatar as AntdAvater} from 'antd'

const { Sider, Header } = Layout;

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider theme={{ hashed: false }}>
    <div>
      <Layout>
        <Sider className={`${styles.sidebar} ${theme === 'dark' ? styles.dark : ''}`} collapsed={collapsed} collapsible trigger={null}>
          <div className={styles.logoGpt}>
            <div className={styles.logoIcon}>
              <OpenAIFilled />
            </div>
          </div>

          <Menu theme={theme} className={styles.menu} mode="inline">
  <Menu.Item key="home" icon={<HomeOutlined />} className={styles.menuItem}>
    <div className={styles.menuItemWrapper}>
      Home
    </div>
  </Menu.Item>
  <Menu.Item key="student" icon={<AuditOutlined />}>
    <div className={styles.menuItemWrapper}>
      Student
    </div>
  </Menu.Item>
  <Menu.SubMenu key="course" icon={<ProductOutlined />} title={<span className={styles.menuItemWrapper}>Course</span>}>
    <Menu.Item key="listcourse">
      <div className={styles.menuItemWrapper}>
        List Course
      </div>
    </Menu.Item>
    <Menu.Item key="addcourse">
      <div className={styles.menuItemWrapper}>
        Add Course
      </div>
    </Menu.Item>
  </Menu.SubMenu>
  <Menu.SubMenu key="quiz" icon={<FormOutlined />} title={<span className={styles.menuItemWrapper}>Quiz</span>}>
    <Menu.Item key="listquiz">
      <div className={styles.menuItemWrapper}>
        List Quiz
      </div>
    </Menu.Item>
    <Menu.Item key="addquiz">
      <div className={styles.menuItemWrapper}>
        Add Quiz
      </div>
    </Menu.Item>
  </Menu.SubMenu>
  <Menu.Item key="settings" icon={<SettingOutlined />}>
    <div className={styles.menuItemWrapper}>
      Settings
    </div>
  </Menu.Item>
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
            <AntdAvater className={`${styles.avatar} ${theme === 'dark' ? styles.dark : ''}`}>US</AntdAvater>
          </Header>
        </Layout>
      </Layout>
    </div>
    </ConfigProvider>
  );
};

export default Sidebar;