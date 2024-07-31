// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Button, Layout, Menu} from 'antd'
import {HomeOutlined, PlusOutlined, AuditOutlined, ProductOutlined, FormOutlined, SettingOutlined, LineChartOutlined} from '@ant-design/icons'
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi'
import logo_light from '../../assets/logo-black.png'
import logo_dark from '../../assets/logo-white.png'
import './Sidebar.css'

const {Sider} = Layout;

// eslint-disable-next-line react/prop-types
const Sidebar = ({theme, setTheme}) => {
    const toggle_mode = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light')
    }

  return (
    <div className='sidebar'>
      <Layout>
        <Sider>
            <img src={logo_dark} alt='' className='logo'></img>

            {/* <button className='createButton' icon={<PlusOutlined />}>Create</button> */}
            <button className='createButton'>
            <PlusOutlined style={{ marginRight: 8 }} />
                Create
            </button>

            <Menu theme='dark' className='menu' mode='inline'>
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
                    {theme == 'light' ? <HiOutlineSun /> : <HiOutlineMoon />}
                </Button>
            </div>
        </Sider>
      </Layout>
    </div>
  ) 
}

export default Sidebar
