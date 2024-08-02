// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import {Button, Layout, Menu} from 'antd'
import {OpenAIFilled, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, AuditOutlined, ProductOutlined, FormOutlined, SettingOutlined, LineChartOutlined} from '@ant-design/icons'
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi'
import './Sidebar.css'
import { ThemeContext } from '../ThemeContext'

const {Sider, Header} = Layout;

// eslint-disable-next-line react/prop-types
const Sidebar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    //theme1 = {darkmode};

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: {colorBgContainer},
    } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider className={`sidebar ${theme}`} collapsed={collapsed} collapsible trigger={null} theme={theme}>
            <div className='logoGpt'>
                <div className='logo-icon'>
                    <OpenAIFilled />
                </div>
            </div>

            <Menu theme={theme} className='menu' mode='inline'>
                <Menu.Item key='home' icon={<HomeOutlined />}>Home</Menu.Item>
                <Menu.Item key='student' icon={<AuditOutlined />}>Student</Menu.Item>
                <Menu.SubMenu key='course' icon={<ProductOutlined />} title='Course'>
                    <Menu.Item key='listcourse'>List Course</Menu.Item>
                    <Menu.Item key='addcourse'>Add Course</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key='quiz' icon={<FormOutlined />} title='Quiz'>
                    <Menu.Item key='listquiz'>List Quiz</Menu.Item>
                    <Menu.Item key='addquiz'>Add Quiz</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key='settings' icon={<SettingOutlined />}>Settings</Menu.Item>
                <Menu.Item key='analysis' icon={<LineChartOutlined />}>Analysis</Menu.Item>
            </Menu>

            <div className='toggle-btn'>
                <Button onClick={toggleTheme}>
                    {theme == 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
                </Button>
            </div>
        </Sider>
        <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}>
            <Button type='text' className='toggle' onClick={() =>setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} />
        </Header>
      </Layout>
      </Layout>
    </div>
  ) 
}

export default Sidebar
