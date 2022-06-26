import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getClassList, getClassListStudent } from '../redux/apiCalls'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Filter, { DropdownItem } from '../components/Filter'
import Modal from '../components/Modal'
import SelectSearch, { fuzzySearch } from 'react-select-search'

const Classes = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const classlist = useSelector(state => state.class.classlist)
    const user = useSelector(state => state.auth.user)
    const semesters = useSelector(state => state.semester.semesters)
    const [semesterid, setSemesterId] = useState(null)
    const [semestername, setSemesterName] = useState("Tất cả")

    const [isVisible, setIsVisible] = useState(false)

    const subjects = useSelector(state => state.subject.subjects)
    const [subId, setSubId] = useState(null);
    const options = subjects?.map((subject) => (
        {
            name: subject.name,
            value: subject.subid
        }
    ))

    useEffect(() => {
        if (Object.keys(user).length > 0 && user.permission == "lecture") {
            getClassList(user.userid, dispatch).then(() => setIsLoading(false))
        } else {
            getClassListStudent(user.studentid, dispatch).then(() => setIsLoading(false))
        }
    }, [user])


    return (
        <>
            <PageHeader>
                <FilterWrapper>
                    <Filter title="Học kỳ" value={semestername}>
                        <div onClick={() => {
                            setSemesterId(null)
                            setSemesterName("Tất cả")
                            // setSearchname(null)
                        }}                              >
                            <DropdownItem>Tất cả</DropdownItem>
                        </div>
                        {
                            semesters.map((item) => (
                                <div onClick={() => {
                                    setSemesterId(item.semesterid)
                                    setSemesterName(item.name)
                                    // setSearchname(null)
                                }}                                       >
                                    <DropdownItem>{item.name}</DropdownItem>
                                </div>
                            ))
                        }
                    </Filter>
                </FilterWrapper>
                {JSON.parse(localStorage.getItem("user")).permission === 'lecture' &&
                    <Button onClick={() => setIsVisible(true)}>Thêm lớp học</Button>}
            </PageHeader>
            {
                isLoading ? <Loading /> :
                    <Wrapper>
                        {
                            classlist?.map((item, index) => (
                                <Panel to={`/class/${item.classid}`}>
                                    <div className="header">
                                        <span>{item.classname}</span>

                                    </div>
                                    <div className="body">
                                        <p className="bold">Môn học: {item.subject}</p>
                                        <p>{item.semester}</p>
                                        {
                                            item.lecture && <p>Giảng viên: {item.lecture}</p>
                                        }
                                    </div>
                                    {/* <div className="footer">
                                        <button onClick={()=>setIsAddDoc(true)}>Nộp báo cáo</button>
                                    </div> */}
                                </Panel>

                            ))
                        }

                    </Wrapper>
            }
            <Modal isVisible={isVisible}
                title="Thêm lớp học"
                onClose={() => setIsVisible(false)}>
                <div className="input-group">
                    <p className="input-title">Tên lớp học</p>
                    <input type="text" placeholder="Nhập tên lớp học" />
                </div>
                <div className="input-group">
                    <p className="input-title">Môn học</p>
                    <SelectSearch
                        options={options}
                        search
                        value={subId}
                        placeholder="Chọn môn học"
                        filterOptions={fuzzySearch}
                        // onChange={setSubId}
                        onChange={setSubId}
                    />
                </div>
                <div className="input-group">
                    <p className="input-title">Học kỳ</p>
                    <SelectSearch
                        options={options}
                        search
                        value={subId}
                        placeholder="Chọn học kỳ"
                        filterOptions={fuzzySearch}
                        // onChange={setSubId}
                        onChange={setSubId}
                    />
                </div>
            </Modal>
        </>
    )
}

export default Classes

const Wrapper = styled.div`
    display: grid ;
    grid-template-columns: repeat(4,1fr);
    gap: 1rem;
    margin-top: 1rem;
`
const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
  align-items:center;
`

const Panel = styled(Link)`
    width: 280px;
    border-radius: 12px;
    background: #FAFAFA;
    border: var(--primary-bg) 1px solid;
    padding: 10px;
    cursor: pointer;

    &:hover{
    border: var(--primary-color) 1px solid;

    }

    .header{
        background:  var(--primary-bg);
        min-height: 100px;
        border-radius: 12px;
        padding:16px ;
        display: flex;
        align-items: flex-end;

        span{
            text-transform: uppercase;
            font-weight: 500;
            color: var(--primary-color);
            font-size: 20px;
        }
    }
    .body{
        margin-top:16px;
        min-height: 80px;
        

        .bold{
            font-weight: 500;
        }
        p{
            
            color: var(--grey);
            margin-bottom: 7px ;
        }
        span{
            margin-left: 0.75rem;
            cursor: pointer;
            &:hover{
                transform: scale(1.05);
                color: var(--primary-color)
            }
        }
    }

    .footer{
        border-top: var(--primary-bg) 1px solid;
        padding-top: 10px;

        button{
            background-color: #fff;
            border: 1px solid var(--primary-bg);
            border-radius:8px;
            padding: 7px 15px;
            color:var(--grey);
            text-transform: uppercase;
            font-weight: 700;
            cursor: pointer;
        }
    }
    
`
const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`
