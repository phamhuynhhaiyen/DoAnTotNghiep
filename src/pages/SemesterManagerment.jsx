import { CloseOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Button from '../components/Button'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'
import SearchInput from '../components/SearchInput'
import StudentsListInProject from '../components/studentsListInProject/StudentsListInProject'
import Table, { TableBody, TableHeader } from '../components/Table'
import { changePrivacy, deleteDocument, getAllLectures, getAllSemesters, getDocuments, getMyDocuments, getSubjects } from '../redux/apiCalls'
import { setIsOpenModal } from '../redux/slices/semesterSlice'

const SemesterManagerment = () => {
  // const [isDeleteForm, setIsDeleteForm] = useState(false)
  // const [deleteId, setDeleteId] = useState()
  // const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const semesters = useSelector(state => state.semester.semesters)
  const docHeader = ["STT", "Đợt bảo vệ", "Thời gian bắt đầu", "Thời gian kết thúc", ""]
  const isFetching = useSelector(state => state.action.isFetching)
  const [semesterid, setSemesterId] = useState()
  const [semestername, setSemestername] = useState()
  const [isVisible, setIsVisible] = useState(false)


  // const pageNumberLimit = documents.totalPages;
  const [currentPage, setCurrentPage] = useState(1);
  // const [maxPageLimit, setMaxPageLimit] = useState(documents.totalPages);
  // const [minPageLimit, setMinPageLimit] = useState(0);

  // const getDoc = () => {
  //     getMyDocuments(user.userid, currentPage, dispatch).then(() => setIsLoading(false));
  // }

  // useEffect(() => {
  //   getAllSemesters(dispatch).then(() => setIsLoading(false));
  // }, [])



  // const onPrevClick = () => {
  //     if ((currentPage - 1) % pageNumberLimit === 0) {
  //         setMaxPageLimit(maxPageLimit - pageNumberLimit);
  //         setMinPageLimit(minPageLimit - pageNumberLimit);
  //     }
  //     setCurrentPage(prev => prev - 1);

  // }
  // const onNextClick = () => {
  //     if (currentPage + 1 > maxPageLimit) {
  //         setMaxPageLimit(maxPageLimit + pageNumberLimit);
  //         setMinPageLimit(minPageLimit + pageNumberLimit);
  //     }
  //     setCurrentPage(prev => prev + 1);
  // }
  // const onPageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  // }

  // const handleDelete = () => {
  //     deleteDocument(deleteId, dispatch).then(() => getDoc());
  //     setIsDeleteForm(false);
  // }

  const handleSelected = (item) => {
    setSemesterId(item.semesterid)
    setSemestername(item.name)
    dispatch(setIsOpenModal(true))
  }

  return (
    <>
      {
        // isFetching ? <Loading /> :
          <>
            <PageHeader>
              <SearchInput placeholder="Tìm kiếm" width="436px" />
              <Button onClick={() => setIsVisible(true)}
              >Thêm đợt bảo vệ</Button>
            </PageHeader>
            <Table>
              <TableHeader>
                {docHeader.map((item, index) => (<td key={index}>{item}</td>))}
              </TableHeader>
              <TableBody>
                {semesters?.map((item, index) => (
                  <tr key={item.semesterid}>
                    <td>{currentPage === 1 ? index + 1 : (index + 1) + 10 * currentPage - 10}</td>
                    <td>{item.name}</td>
                    <td>{item.timebegin}</td>
                    <td>{item.timefinish}</td>

                    <td className="tbl-icon">
                      <EyeOutlined onClick={() => handleSelected(item)} />
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
            <StudentsListInProject semesterid={semesterid} name={semestername} />
            {/* <Pagination currentPage={currentPage} response={documents}
                            onPrevClick={onPrevClick}
                            onNextClick={onNextClick}
                            onPageChange={onPageChange} /> */}
            {/* <AddDocument isVisible={isAddDocumentOpen} /> */}

            {/* <DeleteForm isVisible={isDeleteForm}>
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
                        </DeleteForm> */}
            <Modal isVisible={isVisible}
              title="Thêm đợt bảo vệ"
              onClose={() => setIsVisible(false)}>
              <div className="input-group">
                <p className="input-title">Tên đợt bảo vệ</p>
                <input type="text" placeholder="Nhập tên đợt bảo vệ"/>
              </div>
              {/* <div className="input-group">
                <p className="input-title">Học kỳ</p>
                <input type="text" placeholder="Nhập tên đợt bảo vệ"/>
              </div> */}
              <div className="input-group">
                <p className="input-title">Ngày bắt đầu</p>
                <input type="date" />
              </div>
              <div className="input-group">
                <p className="input-title">Ngày kết thúc</p>
                <input type="date" />
              </div>
            </Modal>
          </>


      }
    </>
  )
}

export default SemesterManagerment

const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
  margin-bottom: 24px;
`