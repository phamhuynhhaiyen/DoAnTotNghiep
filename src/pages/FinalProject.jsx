import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AddDocument from '../components/addDocument/AddDocument'
import { setIsAddDocumentOpen } from '../redux/slices/documentSlice'
import Button from '../components/Button'
import Filter, { DropdownItem } from '../components/Filter'
import SearchInput from '../components/SearchInput'
import Table, { TableBody, TableHeader } from '../components/Table'
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'
import { EyeOutlined } from '@ant-design/icons'
import { getProjectList, getStudentsInSemester } from '../redux/apiCalls'

const FinalProject = () => {

    const isAddDocumentOpen = useSelector(state => state.document.isAddDocumentOpen)
    const dispatch = useDispatch()
    const projects = useSelector(state => state.project.projects)
    const isFetching = useSelector(state => state.action.isFetching)
    const semesters = useSelector(state => state.semester.semesters)
    const lectures = useSelector(state => state.lecture.lectures)
    const gradelist = [59, 60, 61, 62]
    const [grade, setGrade] = useState(null)

    const [semesterid, setSemesterId] = useState(null)
    const [semestername, setSemesterName] = useState("Tất cả")
    const [lectureid, setLectureid] = useState(null)
    const [lecturename, setLectureName] = useState("Tất cả")

    const docHeader = ["STT", "Mã sinh viên", "Tên sinh viên", "Khóa", "Giảng viên hướng dẫn", "Tên đề tài", "Báo cáo"]

    const pageNumberLimit = projects.totalPages;
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(projects.totalPages);
    const [minPageLimit, setMinPageLimit] = useState(0);


    useEffect(() => {
        getProjectList({
            semesterid: semesterid,
            lectureid: lectureid,
            grade: grade,
            page: currentPage
        }, dispatch);
    }, [currentPage, semesterid, lectureid, grade]);


    const onPrevClick = () => {
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev => prev - 1);
    }
    const onNextClick = () => {
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev => prev + 1);
    }
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            {
                isFetching ? <Loading /> :
                    <>
                        <PageHeader>
                            <SearchInput placeholder="Tìm kiếm" width="436px" />
                        </PageHeader>
                        <FilterWrapper>

                            <Filter title="Đợt bảo vệ" value={semestername}>
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
                            <Filter title="Giảng viên hướng dẫn" value={lecturename}>
                                <div onClick={() => {
                                    setLectureid(null)
                                    setLectureName("Tất cả")
                                    // setSearchname(null)
                                }}                               >
                                    <DropdownItem>Tất cả</DropdownItem>
                                </div>
                                {
                                    lectures.map((lec) => (
                                        <div onClick={() => {
                                            setLectureid(lec.lectureid)
                                            setLectureName(lec.name)
                                            // setSearchname(null)
                                        }}
                                        >
                                            <DropdownItem>{lec.name}</DropdownItem>
                                        </div>
                                    ))
                                }
                            </Filter>
                            <Filter title="Khóa" value={grade ? grade : "Tất cả"}>
                                <div onClick={() => {
                                    // setSearchname(null)
                                    // setSubId(null)
                                    setGrade(null)

                                }}>
                                    <DropdownItem>Tất cả</DropdownItem>
                                </div>
                                {
                                    gradelist.map((item) => (
                                        <div onClick={() => {
                                            // setSubId(item.subid)
                                            setGrade(item)
                                            // setSearchname(null)
                                        }}>
                                            <DropdownItem>{item}</DropdownItem>
                                        </div>
                                    ))
                                }
                            </Filter>
                        </FilterWrapper>
                        <Table>
                            <TableHeader>
                                {docHeader.map((item, index) => (<td key={index}>{item}</td>))}
                            </TableHeader>
                            <TableBody>
                                {projects.data?.map((item, index) => (
                                    <tr key={item.projectid}>
                                        <td>{currentPage === 1 ? index + 1 : (index + 1) + 10 * currentPage - 10}</td>
                                        <td>{item.studentid}</td>
                                        <td>{item.studentname}</td>
                                        <td>{item.grade}</td>
                                        <td>{item.lecture}</td>
                                        <td>{item.projectname === null ? 'Chưa có' : item.projectname}</td>
                                        <td>{item.url === null ? 'Chưa có' : item.url}</td>
                                        {/* <td className="tbl-icon">
                                            <EditOutlined />
                                            <DeleteOutlined />
                                        </td> */}
                                    </tr>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination currentPage={currentPage} response={projects}
                            onPrevClick={onPrevClick}
                            onNextClick={onNextClick}
                            onPageChange={onPageChange} />
                        <AddDocument isVisible={isAddDocumentOpen} />
                    </>
            }
        </>
    )
}


export default FinalProject

const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
`

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`