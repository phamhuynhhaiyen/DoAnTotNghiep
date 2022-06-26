import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import AddDocument from '../components/addDocument/AddDocument'
import { setIsAddDocumentOpen } from '../redux/slices/documentSlice'
import Button from '../components/Button'
import Filter, { DropdownItem } from '../components/Filter'
import Table, { TableBody, TableHeader } from '../components/Table'
import { getDocuments, getSubjects } from '../redux/apiCalls'
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'
import { EyeOutlined, SearchOutlined, SlidersOutlined } from '@ant-design/icons'
import { updateMetadata } from 'firebase/storage'

const DocumentList = () => {

  const isAddDocumentOpen = useSelector(state => state.document.isAddDocumentOpen)
  const dispatch = useDispatch()
  const documents = useSelector(state => state.document.documents)
  const subjects = useSelector(state => state.subject.subjects)
  const lectures = useSelector(state => state.lecture.lectures)
  const isFetching = useSelector(state => state.action.isFetching)
  const [isLoading, setIsLoading] = useState(true)

  const docHeader = ["STT", "Tên tài liệu", "Ngày đăng", "Người đăng", "Môn học", "Loại tệp", ""]

  const pageNumberLimit = documents.totalPages;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(documents.totalPages);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [subid, setSubId] = useState(null)
  const [subname, setSubName] = useState("Tất cả")
  const [lectureid, setLectureid] = useState(null)
  const [lecturename, setLectureName] = useState("Tất cả")
  const [searchname, setSearchname] = useState(null)



  // useEffect(() => {
  //   getSubjects(dispatch)
  // }, [])

  useEffect(() => {
    getDocuments({
      name: searchname,
      lectureid: lectureid,
      subid: subid,
      privacy: 1,
      page: currentPage
    }, dispatch)
  }, [currentPage, subid, lectureid, searchname]);


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
              <SearchInput width="436px"  height="48px">
                <SearchOutlined />
                <input placeholder="Nhập tên tài liệu"  onKeyPress={(e)=>{
                  if(e.key === 'Enter'){
                    setSearchname(e.target.value)
                    setLectureName("Tất cả")
                    setLectureid(null)
                    setSubName("Tất cả")
                    setSubId(null)
                  }
                }}/>
                <div className="filter-icon">
                  <SlidersOutlined />
                </div>
              </SearchInput>
              {
                JSON.parse(localStorage.getItem("user")).permission !== 'student'
                && <Button onClick={() => dispatch(setIsAddDocumentOpen(true))}>Thêm tài liệu</Button>
              }

            </PageHeader>
            <FilterWrapper>

              <Filter title="Môn học" value={subname}>
                <div onClick={() => {
                  setSubId(null)
                  setSubName("Tất cả")
                  setSearchname(null)
                }}>
                  <DropdownItem>Tất cả</DropdownItem>
                </div>
                {
                  subjects.map((subject) => (
                    <div onClick={() => {
                      setSubId(subject.subid)
                      setSubName(subject.name)
                      setSearchname(null)
                    }}>
                      <DropdownItem>{subject.name}</DropdownItem>
                    </div>
                  ))
                }
              </Filter>
              <Filter title="Người đăng" value={lecturename}>
                <div onClick={() => {
                  setLectureid(null)
                  setLectureName("Tất cả")
                  setSearchname(null)
                }}>
                  <DropdownItem>Tất cả</DropdownItem>
                </div>
                {
                  lectures.map((lec) => (
                    <div onClick={() => {
                      setLectureid(lec.lectureid)
                      setLectureName(lec.name)
                      setSearchname(null)
                    }}>
                      <DropdownItem>{lec.name}</DropdownItem>
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
                {documents.data?.map((item, index) => (
                  <tr key={item.docid}>
                    <td>{currentPage === 1 ? index + 1 : (index + 1) + 10 * currentPage - 10}</td>
                    <td>{item.name}</td>
                    <td>{item.posting_date}</td>
                    <td>{item.lecture}</td>
                    <td>{item.subject}</td>
                    <td>{item.type}</td>
                    <td className="tbl-icon" onClick={() => window.open(`http://localhost:3000/view-document/${item.docid}`)}><EyeOutlined /></td>
                  </tr>
                ))}
              </TableBody>
            </Table>
            <Pagination currentPage={currentPage} response={documents}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              onPageChange={onPageChange} />
            <AddDocument isVisible={isAddDocumentOpen} />
          </>
      }
    </>
  )
}


export default DocumentList

const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
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