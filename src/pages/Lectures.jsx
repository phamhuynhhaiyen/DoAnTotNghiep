import { CloseOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Button from '../components/Button'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'
import SearchInput from '../components/SearchInput'
import Table, { TableBody, TableHeader } from '../components/Table'
import { changePrivacy, deleteDocument, getAllLectures, getDocuments, getMyDocuments, getSubjects } from '../redux/apiCalls'

const Lectures = () => {
    // const [isDeleteForm, setIsDeleteForm] = useState(false)
    // const [deleteId, setDeleteId] = useState()
    // const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const lectures = useSelector(state => state.lecture.lectures)
    const docHeader = ["STT", "Tên giảng viên", "Tên đăng nhập", ""]
    const [isLoading, setIsLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    // const pageNumberLimit = documents.totalPages;
    const [currentPage, setCurrentPage] = useState(1);
    // const [maxPageLimit, setMaxPageLimit] = useState(documents.totalPages);
    // const [minPageLimit, setMinPageLimit] = useState(0);

    // const getDoc = () => {
    //     getMyDocuments(user.userid, currentPage, dispatch).then(() => setIsLoading(false));
    // }

    useEffect(() => {
        getAllLectures(dispatch).then(() => setIsLoading(false));
    }, [])



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

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <>
                        <PageHeader>
                            <SearchInput placeholder="Tìm kiếm" width="436px" />
                            <Button onClick={()=>setIsVisible(true)}
                            >Thêm giảng viên</Button>
                        </PageHeader>
                        <Table>
                            <TableHeader>
                                {docHeader.map((item, index) => (<td key={index}>{item}</td>))}
                            </TableHeader>
                            <TableBody>
                                {lectures?.map((item, index) => (
                                    <tr key={item.lectureid}>
                                        <td>{currentPage === 1 ? index + 1 : (index + 1) + 10 * currentPage - 10}</td>
                                        <td>{item.name}</td>
                                        <td>{item.username}</td>

                                        <td className="tbl-icon">
                                            <EditOutlined />
                                            <DeleteOutlined />
                                        </td>
                                    </tr>
                                ))}
                            </TableBody>
                        </Table>
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
                            title="Thêm giảng viên"
                            onClose={() => setIsVisible(false)}>
                            <div className="input-group">
                                <p className="input-title">Tên giảng viên</p>
                                <input type="text" placeholder="Nhập tên giảng viên" />
                            </div>
                        </Modal>
                    </>


            }
        </>
    )
}

export default Lectures

const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
  margin-bottom: 24px;
`