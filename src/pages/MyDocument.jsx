import { CloseOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, SlidersOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import AddDocument from '../components/addDocument/AddDocument'
import Button from '../components/Button'
import Filter, { DropdownItem } from '../components/Filter'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import Switch from "react-switch";
import Table, { TableBody, TableHeader } from '../components/Table'
import { changePrivacy, deleteDocument, getDocuments, getMyDocuments, getSubjects } from '../redux/apiCalls'
import { setIsAddDocumentOpen } from '../redux/slices/documentSlice'
import app from '../firebase'
import { deleteObject, getStorage, ref } from 'firebase/storage'

const MyDocument = () => {

  const isAddDocumentOpen = useSelector(state => state.document.isAddDocumentOpen)
  const [isDeleteForm, setIsDeleteForm] = useState(false)
  const [deleteitem, setDeleteItem] = useState()
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const documents = useSelector(state => state.document.documents)
  const docHeader = ["STT", "Tên tài liệu", "Ngày đăng", "Môn học", "Quyền riêng tư", ""]
  const [isLoading, setIsLoading] = useState(true)

  const pageNumberLimit = documents.totalPages;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(documents.totalPages);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const [subid, setSubId] = useState(null)
  const [subname, setSubName] = useState("Tất cả")
  const [searchname, setSearchname] = useState(null)
  const subjects = useSelector(state => state.subject.subjects)

  const getDoc = () => {
    getDocuments({
      subid: subid,
      name: searchname,
      lectureid: user.lectureid,
      page: currentPage
    }, dispatch).then(() => setIsLoading(false));
  }

  // useEffect(() => {
  //   getSubjects(dispatch)
  // }, [])

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      getDoc()
    }
  }, [currentPage, user, subid, searchname]);



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

  const handleDelete = () => {
    deleteDocument(deleteitem.docid, dispatch).then(() => {
      // Create a reference to the file to delete

      const storage = getStorage(app);
      const desertRef = ref(storage, deleteitem.firebase_name);

      // Delete the file
      deleteObject(desertRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
      getDoc()
    });
    setIsDeleteForm(false);
  }

  return (
    <>
      {
        isLoading ? <Loading /> :
          <>
            <PageHeader>
              <SearchInput width="436px" height="48px">
                <SearchOutlined />
                <input placeholder="Nhập tên tài liệu" onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setSearchname(e.target.value)
                    setSubName("Tất cả")
                    setSubId(null)
                  }
                }} />
                <div className="filter-icon">
                  <SlidersOutlined />
                </div>
              </SearchInput>
              <Button
                onClick={() => dispatch(setIsAddDocumentOpen(true))}>Thêm tài liệu</Button>
            </PageHeader>
            <FilterWrapper>

              <Filter title="Môn học" value={subname}>
                <div onClick={() => {
                  setSearchname(null)
                  setSubId(null)
                  setSubName("Tất cả")

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
                    <td>{item.subject}</td>
                    <td style={{ transform: "scale(0.7)" }}>
                      <Switch
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor={"#2196F3"}
                        offColor={"#B2BEC3"}
                        checked={item.privacy}
                        onChange={() => {
                          changePrivacy({
                            docid: item.docid,
                            privacy: !item.privacy
                          }, dispatch)
                        }}
                      />
                    </td>
                    <td className="tbl-icon">
                      <EyeOutlined onClick={() => window.open(`http://localhost:3000/view-document/${item.docid}`)} />
                      <DeleteOutlined
                        onClick={() => {
                          setIsDeleteForm(true)
                          setDeleteItem(item)
                        }} />
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
            <Pagination currentPage={currentPage} response={documents}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              onPageChange={onPageChange} />
            <AddDocument isVisible={isAddDocumentOpen} />

            <DeleteForm isVisible={isDeleteForm}>
              <div className="modal">
                <div className="modal-header">
                  <span className="title">CẢNH BÁO</span>
                  <div className="close" onClick={() => setIsDeleteForm(false)}><CloseOutlined /></div>
                </div>
                <div className="modal-body">
                  <p>Thao tác không thể khôi phục. Bạn có chắc chắc muốn xóa tài liệu này?</p>
                </div>
                <div className="modal-footer">
                  <Button secondaryStyle={true} onClick={() => setIsDeleteForm(false)}>Hủy</Button>
                  <Button onClick={handleDelete}>Xóa</Button>
                </div>
              </div>
            </DeleteForm>
          </>


      }
    </>
  )
}

export default MyDocument

const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
`

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`

const DeleteForm = styled.div`
 display: ${props => props.isVisible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    .modal{
        width: 672px;
        background-color: #fff;
        border-radius: 12px;
        
        &-header{
            padding: 2rem;
            display: flex;
            justify-content:space-between;
            font-size: 16px;
            border-bottom: 1px solid var(--primary-bg);

            .title{
                font-weight: 600;
            }
            .close{
                color: var(--light-grey);
                cursor: pointer;
            }
        }

        &-body{
            padding: 2rem;

            

        }

        &-footer{
            border-top: 1px solid var(--primary-bg);
            padding: 2rem;
            display: flex;
            gap: 2rem;
            justify-content:center;
        }
    }
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