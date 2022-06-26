import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import Filter, { DropdownItem } from '../components/Filter'
import Table, { TableBody, TableHeader } from '../components/Table'
import { getAllStudents } from '../redux/apiCalls'
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'
import { DeleteOutlined, EditOutlined, SearchOutlined, SlidersOutlined } from '@ant-design/icons'
import Modal from '../components/Modal'
import SelectSearch from 'react-select-search'

const Students = () => {

  const dispatch = useDispatch()
  const students = useSelector(state => state.student.students)
  const isFetching = useSelector(state => state.action.isFetching)

  const docHeader = ["STT", "Mã sinh viên", "Tên", "Khóa", "Ngày sinh", ""]

  const pageNumberLimit = students.totalPages;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(students.totalPages);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [grade, setGrade] = useState(null)
  const [searchname, setSearchname] = useState(null)

  const gradelist = [59, 60, 61, 62]

  const onClose = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    getAllStudents({
      name: searchname,
      grade: grade,
      page: currentPage
    }, dispatch);
  }, [currentPage, grade, searchname]);


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
              <SearchInput width="436px" height="48px">
                <SearchOutlined />
                <input placeholder="Nhập tên sinh viên" onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setSearchname(e.target.value)
                    setGrade(null)
                  }
                }} />
                <div className="filter-icon">
                  <SlidersOutlined />
                </div>
              </SearchInput>
              <div className="btn-group">
                <button className="btn-excel">
                  Thêm từ file Excel
                  <input type="file"
                    // accept={SheetJSFT}
                    // onChange={(event) => handleImportFile(event)}
                    // onClick={(event) => { event.target.value = null }} 
                    />
                </button>
                <Button onClick={() => setIsVisible(true)}>Thêm sinh viên</Button>
              </div>
            </PageHeader>
            <FilterWrapper>

              <Filter title="Khóa" value={grade ? grade : "Tất cả"}>
                <div onClick={() => {
                  setSearchname(null)
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
                      setSearchname(null)
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
                {students.data?.map((item, index) => (
                  <tr key={item.studentid}>
                    <td>{currentPage === 1 ? index + 1 : (index + 1) + 10 * currentPage - 10}</td>
                    <td>{item.studentid}</td>
                    <td>{item.name}</td>
                    <td>{item.grade}</td>
                    <td>{item.dob}</td>
                    <td className="tbl-icon">
                      <EditOutlined />
                      <DeleteOutlined />
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
            <Pagination currentPage={currentPage} response={students}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              onPageChange={onPageChange} />
          </>
      }
      <Modal isVisible={isVisible} title="THÊM SINH VIÊN" onClose={onClose}>
        <div className="input-group">
          <p className="input-title">Mã sinh viên</p>
          <input type="text" placeholder="Nhập mã sinh viên" />
        </div>
        <div className="input-group">
          <p className="input-title">Tên sinh viên</p>
          <input type="text" placeholder="Nhập tên sinh viên" />
        </div>
        <div className="input-group">
          <p className="input-title">Khóa</p>
          <SelectSearch
            options={[
              {
                name: "Khóa 62",
                value: 62
              },
              {
                name: "Khóa 61",
                value: 61
              },
              {
                name: "Khóa 60",
                value: 60
              },
              {
                name: "Khóa 59",
                value: 59
              }
            ]}
            placeholder="Chọn môn học"
          // onChange={setSubId}
          />
        </div>
        <div className="input-group">
          <p className="input-title">Ngày sinh</p>
          <input type="date" placeholder="Nhập ngày sinh" />
        </div>
      </Modal>
    </>
  )
}


export default Students

const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
  .btn-excel{
    background: #1D6F42;
    border-radius: 12px;
    border: #1D6F42 1.4px solid;
    height: 48px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    width: 180px;
    margin-right: 10px;
    position: relative;

    input[type="file"]{
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        opacity: 0
    }
  }
`

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`

const SearchInput = styled.div`
  width: ${props => props.width};
    background: var(--grey-bg);
    border: var(--primary-bg) 1px solid;
    border-radius: 12px;
    height: ${props => props.height ? props.height : `48px`};
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    font-size: 18px;
    color: var(--light-grey);

    input{
        border: none;
        background: var(--grey-bg);
        width: 100% ;
    }

    .filter-icon{
        display: ${props => props.filterIcon ? null : 'none'};
        background: var(--primary-bg);
        border-radius: 12px;
        padding:5px 7px;
        cursor: pointer;
        color: var(--primary-color);
    }
`