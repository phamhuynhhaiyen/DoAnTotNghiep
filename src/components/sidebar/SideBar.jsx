import { DatabaseOutlined, DesktopOutlined, FolderOpenOutlined } from '@ant-design/icons'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Wrapper } from './SideBarStyle'

const menuItems = [
  {
    name: 'Tài liệu',
    icon: <FolderOpenOutlined />,
    submenu: [
      {
        name: 'Danh sách tài liệu',
        path: '/document-list'
      },
      {
        name: 'Tài liệu của bạn',
        path: '/my-document'
      }
    ]
  },
  {
    name: 'Đồ án',
    icon: <DatabaseOutlined />,
    submenu: [
      {
        name: 'Danh sách đồ án',
        path: '/final-project-list'
      },
      {
        name: 'Duyệt đồ án',
        path: '/approve-final-project'
      }
    ]
  },
  {
    name: 'Lớp học',
    icon: <DesktopOutlined />,
    path: '/class'
  }
]

const SideBar = () => {

  const location = useLocation()

  return (
    <Wrapper>
      {
        menuItems.map((item) => (
          <div className="menu-item">
            {
              item.path ?
                <div className={`link-name ${item.path === location.pathname && 'active-separate'}`}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </div> :
                <div className={`link-name ${item.submenu.some((obj)=>obj.path === location.pathname) && 'active'}`}>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
            }
            {
              item.submenu && (
                <div className="sub-menu">
                  <div className="line"></div>
                  <div className="sub-menu__item">
                    {
                      item.submenu.map((subItem) => (
                        <li className={location.pathname === subItem.path ? 'active' : ''}><Link to={subItem.path}>{subItem.name}</Link></li>
                      ))
                    }
                  </div>
                </div>
              )
            }
          </div>
        ))
      }

    </Wrapper>
  )
}

export default SideBar