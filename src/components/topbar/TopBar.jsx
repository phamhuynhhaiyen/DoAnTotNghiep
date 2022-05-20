import React from 'react'
import { Wrapper } from './TopBarStyle'
import logo from '../../assets/logo.png'
import userImg from '../../assets/image1.png'
import {CalendarOutlined, HistoryOutlined, MenuOutlined, SettingOutlined} from '@ant-design/icons'
import SearchInput from '../SearchInput'

const TopBar = () => {
  return (
    <Wrapper>
      <div className="nav-left">
        <img src={logo}/>
        <div className="menu-bar">
          <MenuOutlined />
        </div>
      </div>
      <div className="nav-right">
        <SearchInput width="365px" placeholder="Search" filterIcon={true}/>
        <div className="nav-tool">
          <div className="nav-item">
            <div className="nav-item__icon"><HistoryOutlined /></div>
            <p>Lịch sử hoạt động</p>
          </div>
          <div className="nav-item">
            <div className="nav-item__icon"><CalendarOutlined /></div>
            <p>Sự kiện</p>
          </div>
          <div className="nav-user">
              <img src={userImg}/>
              <SettingOutlined />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default TopBar
