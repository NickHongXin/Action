import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon, Layout } from 'antd'
import { allMenu } from '../utils/menu.js'
import Contents from './content'
import './index.less'
import {connect} from 'react-redux'

const SubMenu = Menu.SubMenu;

class Container extends React.Component {
  constructor(){
      super();
  }
  
  componentWillMount(){
    if (!this.props.isLogin) {
        this.props.history.replace('/login')

    }
  }


  componentDidMount() {
    
    this.handleClick([], 'list')
  }

  handleClick = (e, special) => {
    this.props.handleClick(e.key, special)
  }

  render() {
    return (
      <Layout className="containAll">
        <Menu
            onClick={this.handleClick}
            defaultOpenKeys={['']}
            selectedKeys={[this.props.current]}
            className="menu"
            mode="horizontal">
            {
              allMenu.map((subMenu) => {
                if (subMenu.children && subMenu.children.length) {
                  return (
                    <SubMenu key={subMenu.url} title={<span><Icon type={subMenu.icon} /><span>{subMenu.name}</span></span>}>
                      {subMenu.children.map(menu => (
                        <Menu.Item key={menu.url}><Link to={`/${menu.url}`}>{menu.name}</Link></Menu.Item>
                      ))}
                    </SubMenu>
                  )
                }
                return (
                  <Menu.Item key={subMenu.url}>
                    <Link to={`/${subMenu.url}`}>
                      <Icon type={subMenu.icon} /><span className="nav-text">{subMenu.name}</span>
                    </Link>
                  </Menu.Item>
                )
              })
            }
            <Menu.Item className="logOut" key="logOut">
              <Link to="/login" >
                <Icon type="user" />{this.props.username}<span className="nav-text">退出</span>
              </Link>
            </Menu.Item>
          </Menu>
        <Layout>
          <Contents />
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin,
    current: state.currenttab,
    username: state.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (key, special) => dispatch(
      { 
        type: 'TAB_SWITCH', 
        tabkey: key, 
        specialkey: special 
      })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);