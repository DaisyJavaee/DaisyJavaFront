import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { Layout, Menu, Input, Space, Divider, Button } from 'antd'
import {
  CommentOutlined,
  HomeOutlined,
  UserOutlined,
  RadarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import logo from './logo-re.png'
import { isLogined, clearToken } from '../../utils/auth'
import LogoutHeaderNav from './LogoutHeaderNav'
import '../../style/comm/HeaderNav.css'

const { SubMenu } = Menu
const { Search } = Input
// var islog;
class HeaderNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //   isLogin: false,
      islog: false,
    }

    // 这个绑定是必要的，使`this`在回调中起作用
    this.logoutClick = this.logoutClick.bind(this)
  }

  logoutClick() {
    clearToken()
    setTimeout(() => {
      this.setState({
        islog: false,
      })
    })
  }
  // searchJump(value){
  //     console.log(value)
  //     console.log(value.length)
  //     var w=window.open('about:blank')
  //     if(value.length === 0){
  //         // window.open="#/search"
  //         w.location.href="#/search"
  //     }
  //     else{
  //         // var w=window.open('about:blank')
  //         w.location.href="#/searchResult/type=comp?"+String(value)
  //     }
  // }

  render() {
    this.state.islog = isLogined()
    return this.state.islog ? (
      <div>
        <Layout>
          <Space
            size={20}
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              background: 'white',
            }}
          >
            <div
              className="logo"
              style={{ margin: '0,100px', position: 'relative', left: '50%' }}
            >
              <NavLink to="home">
                <img height={'40px'} src={logo} alt="logo" />
              </NavLink>
            </div>
            {/* <div style={{position:'relative',}}>
                            <Button onClick={this.handleClick} style={{width:'60px'}}>
                                {this.state.isLogin ? 'OFF':'IN' }
                            </Button>
                        </div> */}
            <div style={{ position: 'relative', width: '100%' }}>
              <Menu
                id="headerNav"
                style={{ position: 'relative', width: '100%', left: '15%' }}
                mode="horizontal"
              >
                <Menu.Item
                  key="home"
                  icon={<HomeOutlined />}
                  style={{ margin: '0 50px' }}
                >
                  <NavLink to="homePage">首页</NavLink>
                </Menu.Item>

                <Menu.Item
                  key="compPage"
                  icon={<RadarChartOutlined />}
                  style={{ margin: '0 50px' }}
                >
                  <NavLink to="allCompPage">比赛</NavLink>
                </Menu.Item>
                <Menu.Item key="userHome" icon={<UserOutlined />}>
                  <NavLink
                    to={
                      '/personal/account=' +
                      (JSON.parse(localStorage.getItem('userData'))
                        ? JSON.parse(localStorage.getItem('userData')).account
                        : null)
                    }
                  >
                    个人主页
                  </NavLink>
                </Menu.Item>

                <SubMenu
                  icon={<CommentOutlined />}
                  style={{ margin: '0 50px' }}
                  key="messageMenu"
                  // style={{ visibility: this.state.isVisibility,}}
                  title={'消息'}
                >
                  <Menu.Item key="systemNotice">
                    <NavLink to="message/system">系统公告</NavLink>
                  </Menu.Item>

                  <Menu.Item key="compNotice">
                    <NavLink to="message/comp">比赛通知</NavLink>
                  </Menu.Item>

                  <Menu.Item key="replyNotice">
                    <NavLink to="message/reply">回复我的</NavLink>
                  </Menu.Item>

                  <Menu.Item key="teamNotice">
                    <NavLink to="message/team">队伍消息</NavLink>
                  </Menu.Item>

                  <Menu.Item key="applyNotice">
                    <NavLink to="message/apply">组队申请</NavLink>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item
                  key="signOut"
                  icon={<LogoutOutlined />}
                  style={{ left: '100px', float: 'right' }}
                  onClick={this.logoutClick}
                >
                  登出
                </Menu.Item>
              </Menu>
            </div>
          </Space>
        </Layout>

        <Divider
          style={{ position: 'fixed', zIndex: 1, width: '100%', top: 23 }}
        />
        <Divider
          style={{ position: 'fixed', zIndex: 1, width: '100%', top: 23 }}
        />
        <Divider
          style={{ position: 'fixed', zIndex: 1, width: '100%', top: 24 }}
        />
      </div>
    ) : (
      <LogoutHeaderNav />
    )
  }
}

export default HeaderNav
