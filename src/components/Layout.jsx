import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate  } from 'react-router-dom'
import { getAllLectures, getAllSemesters, getLecture, getStudent, getSubjects } from '../redux/apiCalls'
import SideBar from './sidebar/SideBar'
import TopBar from './topbar/TopBar'

const Layout = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const dispatch = useDispatch();

  useEffect(() => {
    if(user !== null && user.permission === "lecture"){
      getLecture(dispatch, user.userid)
    }if(user !== null && user.permission === "student"){
      getStudent(dispatch, user.userid)
    }
    getAllLectures(dispatch)
    getSubjects(dispatch)
    getAllSemesters(dispatch)
  },[user])

  return (
    user ? 
     <div className="App">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="page">
          <Outlet/>
        </div>
      </div>
    </div> 
    : <Navigate to="/signin" />
  )
}

export default Layout