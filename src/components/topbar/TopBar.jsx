import React, { useRef } from 'react'
import { Wrapper } from './TopBarStyle'
import logo from '../../assets/Lo1.png'
import userImg from '../../assets/image1.png'
import { CalendarOutlined, ExportOutlined, HistoryOutlined, MenuOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import SearchInput from '../SearchInput'

const TopBar = () => {

  const dropdownRef = useRef()

  const logout = () => {
    localStorage.clear();
    window.location.reload()
  }

  return (
    <Wrapper>
      <div className="nav-left">
        <img src={logo} />
        <div className="menu-bar">
          <MenuOutlined />
        </div>
      </div>
      <div className="nav-right">
        {/* <SearchInput width="365px" placeholder="Search" filterIcon={true} /> */}
        <div className="nav-tool">
          {/* <div className="nav-item">
            <div className="nav-item__icon"><HistoryOutlined /></div>
            <p>Lịch sử hoạt động</p>
          </div>
          <div className="nav-item">
            <div className="nav-item__icon"><CalendarOutlined /></div>
            <p>Sự kiện</p>
          </div> */}
          <div className="nav-user" onClick={() => dropdownRef.current.classList.toggle('active')}>
            {/* <img src={userImg} /> */}
            <div className="nav-user__icon">
              <UserOutlined />
            </div>

            <SettingOutlined />
          </div>
          <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header">
              <img src={userImg} />
              <span>{JSON.parse(localStorage.getItem('user')).name}</span>
            </div>
            <div className="dropdown-item" onClick={logout}>
              <ExportOutlined />
              Sign out
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default TopBar
