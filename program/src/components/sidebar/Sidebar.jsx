// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import {Button, Layout, Menu, theme} from 'antd'
import {OpenAIFilled, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, PlusOutlined, AuditOutlined, ProductOutlined, FormOutlined, SettingOutlined, LineChartOutlined} from '@ant-design/icons'
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi'
import logo_light from '../../assets/logo-black.png'
import logo_dark from '../../assets/logo-white.png'
import './Sidebar.css'

const {Sider, Header} = Layout;

// eslint-disable-next-line react/prop-types
const Sidebar = ({theme1, setTheme}) => {
    const toggle_mode = () => {
        theme1 == 'light' ? setTheme('dark') : setTheme('light')
    }

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: {colorBgContainer},
    } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider className='sidebar' collapsed={collapsed} collapsible trigger={null} theme={theme1 == 'light' ? 'light' : 'dark'}>
            {/* <img src={theme1 == 'light' ? logo_light : logo_dark} alt='' className='logo'></img> */}

            {/* <button className='createButton' icon={<PlusOutlined />}>Create</button>
            <button className='createButton'>
            <PlusOutlined style={{ marginRight: 8 }} />
                Create
            </button> */}
            <div className='logo'>
                <div className='logo-icon'>
                    <OpenAIFilled />
                </div>
            </div>

            <Menu theme={theme1 == 'light' ? 'light' : 'dark'} className='menu' mode='inline'>
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
                <Button onClick={() => {toggle_mode()}}>
                    {theme1 == 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
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
