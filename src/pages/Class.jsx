import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import DocumentListInClass from '../components/DocumentListInClass'
import LectureAssignment from '../components/LectureAssignment'
import StudentAssignment from '../components/StudentAssignment'
import StudentClassDoc from '../components/StudentClassDoc'
import StudentListInClass from '../components/StudentListInClass'
import { getAssignmentofLecture, getAssignmentofStudent, getClass, getClassPrev, getStudentClass } from '../redux/apiCalls'

const Class = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [menu, setMenu] = useState()
  const [component, setComponent] = useState()
  const thisClass = useSelector(state => state.class.thisClass)
  const { classid } = useParams()
  const dispatch = useDispatch()

  const menuLecture = [
    {
      name: "Tài liệu riêng tư",
      component: <DocumentListInClass />
    },
    {
      name: "Bài tập lớn",
      component: <LectureAssignment />
    },
    {
      name: "Danh sách sinh viên",
      component: <StudentListInClass />
    },
    {
      name: "Vào phòng họp",
      path: '/meet/'+ thisClass.classid +"-"+ thisClass.classname
    }
  ]
  const menuStudent = [
    {
      name: "Tài liệu",
      component: <StudentClassDoc />
    },
    {
      name: "Bài tập lớn",
      component: <StudentAssignment />
    },
    {
      name: "Vào phòng họp",
      path: '/meet/'+ thisClass.classid +"-"+ thisClass.classname
    }
  ]

  
  useEffect(() => {
    if (user.permission === "lecture") {
      setComponent("Tài liệu riêng tư")
      setMenu(menuLecture)
      getClass(classid, dispatch)
      getAssignmentofLecture(classid, dispatch)


    } else if (user.permission === "student") {
      setComponent("Tài liệu")
      setMenu(menuStudent)
      getStudentClass(classid, dispatch)
      getAssignmentofStudent(classid, user.username, dispatch)
    }

  }, [classid])

  return (
    <Wrapper>
      <div className="top">
        <div className="menu-container">

          {
            menu?.map((item) => (
              item.path ? 
              <div
                className="menu-item"
                onClick={()=>window.open(item.path)}>
                {item.name}
              </div> : 
              <div
              className={`menu-item ${component === item.name && 'active'}`}
              onClick={() => setComponent(item.name)}>
              {item.name}
            </div>
            ))
          }
        </div>
        <h3>{thisClass.classname}</h3>
      </div>
      <div className="body-main">
        {
          menu?.filter(item => item.name === component)[0].component
        }
      </div>
    </Wrapper>
  )
}

export default Class

const Wrapper = styled.div`

  .top{
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid var(--primary-bg);
    h3{
      text-transform: uppercase;
    }
  }
  
  .menu-container{
    display: flex;
    gap:30px;
    padding-bottom: 16px;
    

    .menu-item{
      cursor:pointer;
      font-weight: 500;

      &.active{
        color: var(--primary-color);
      }
    }
  }

  .body-main{
    margin-top:16px;
  }
`
