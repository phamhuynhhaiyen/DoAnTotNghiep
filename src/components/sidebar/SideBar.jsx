import { DatabaseOutlined, DesktopOutlined, FolderOpenOutlined, IdcardOutlined, LaptopOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Wrapper } from './SideBarStyle'


const menuLecture = [
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
    path: '/final-project'
  },
  {
    name: 'Lớp học',
    icon: <DesktopOutlined />,
    path: '/class'
  }
]
const menuAdmin = [
  {
    name: 'Tài khoản',
    icon: <IdcardOutlined />,
    submenu: [
      {
        name: 'Sinh viên',
        path: '/students'
      },
      {
        name: 'Giảng viên',
        path: '/lectures'
      }
    ]
  },
  {
    name: 'Môn học',
    icon: <LaptopOutlined />,
    path: '/subjects'
  },
  {
    name: 'Đợt bảo vệ đồ án',
    icon: <DatabaseOutlined />,
    path: '/semester-managerment'
  }
]

const menuStudent = [
  {
    name: 'Tài liệu',
    icon: <FolderOpenOutlined />,
    path: '/document-list'
  },
  {
    name: 'Đồ án',
    icon: <DatabaseOutlined />,
    submenu: [
      {
        name: 'Danh sách đồ án',
        path: '/final-project'
      },
      {
        name: 'Đồ án của bạn',
        path: '/my-final-project'
      },
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
  const [menuItems, setMenuItems] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    if (user !== null && user.permission === "lecture") {
      setMenuItems(menuLecture)
    }
    if (user !== null && user.permission === "admin") {
      setMenuItems(menuAdmin)
    }
    if (user !== null && user.permission === "student") {
      setMenuItems(menuStudent)
    }
  }, [user])

  // console.log(location)

  return (
    <Wrapper>
      {
        menuItems.map((item) => (
          <div className="menu-item">
            {
              item.path ?
                <div className={`link-name ${location.pathname.includes(item.path) && 'active-separate'}`}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </div> :
                <div className={`link-name ${item.submenu.some((obj) => obj.path === location.pathname) && 'active'}`}>
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