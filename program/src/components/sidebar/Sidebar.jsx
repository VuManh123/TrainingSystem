// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { Button, Layout, Menu } from 'antd';
import { OpenAIFilled, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, AuditOutlined, ProductOutlined, FormOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { ThemeContext } from '../ThemeContext';
import styles from './Sidebar.module.css';
import { BodyHome } from '../admin/home';
import {Avatar as AntdAvater} from 'antd'

const { Sider, Header } = Layout;

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

          <Menu theme={theme} className={styles.menu} mode="inline">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="student" icon={<AuditOutlined />}>
              Student
            </Menu.Item>
            <Menu.SubMenu key="course" icon={<ProductOutlined />} title="Course">
              <Menu.Item key="listcourse">List Course</Menu.Item>
              <Menu.Item key="addcourse">Add Course</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="quiz" icon={<FormOutlined />} title="Quiz">
              <Menu.Item key="listquiz">List Quiz</Menu.Item>
              <Menu.Item key="addquiz">Add Quiz</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="analysis" icon={<LineChartOutlined />}>
              Analysis
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
  );
};

export default Sidebar;