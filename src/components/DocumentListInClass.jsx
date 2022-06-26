import { CloseOutlined, DeleteOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { publishRequest } from '../redux/requesMethod'
import Button from './Button'
import CheckBox from './Checkbox'
import Table, { TableBody, TableHeader } from './Table'

import imgMinus from '../assets/minus.svg'
import imgArtwork from '../assets/artwork.svg'
import Loading from './Loading'
import { getClass } from '../redux/apiCalls'
import { setIsDeleteForm } from '../redux/slices/actionSlice'
import ModalDelete from './ModalDelete'

const DocumentListInClass = () => {
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useDispatch()
    const isFetching = useSelector(state => state.action.isFetching)


    const [myDoc, setMyDoc] = useState([])

    const user = useSelector(state => state.auth.user)
    const thisClass = useSelector(state => state.class.thisClass)

    const [docidlist, setDocidList] = useState([])
    const [docidlistMain, setDocidListMain] = useState([])

    const [deleteid, setDeleteid] = useState(null)
    useEffect(() => {
        const getMyDoc = async () => {
            try {
                // const res = await publishRequest.get(`/documents?lectureid=${user.lectureid}&subid=${thisClass.subid}`);
                const res = await publishRequest.get(`/my_doc_in_class?lectureid=${user.lectureid}&subid=${thisClass.subid}`);
                setMyDoc(res.data.filter(item => item.privacy === false))
            } catch (error) {
                console.log(error)
            }
        }

        if (user.lectureid && thisClass.subid) {
            getMyDoc()
        }

    }, [user, thisClass])

    const handleDone = () => {
        docidlist.forEach(element => {
            const AddDocInClass = async (data) => {
                try {
                    const res = await publishRequest.post(`/doc_in_class`, data)
                } catch (error) {
                    console.log(error)
                }
            }
            AddDocInClass({ docid: element, classid: thisClass.classid }).then(() => {
                setIsVisible(false)
                getClass(thisClass.classid, dispatch)
                setDocidList([])
            });
        });
    }

    const handleDelete = () => {

        const deleteDocument = async (id) => {
            try {
                const res = await publishRequest.get(`/doc_in_class/delete/${id}`)
            } catch (error) {
                console.log(error)
            }
        }
        deleteDocument(deleteid).then(() => {
            getClass(thisClass.classid, dispatch)
            dispatch(setIsDeleteForm(false))
        })
    }

    const handleMultipleDelete = () =>{
        docidlistMain.forEach(element => {
            const deleteDocument = async (id) => {
                try {
                    const res = await publishRequest.get(`/doc_in_class/delete/${id}`)
                } catch (error) {
                    console.log(error)
                }
            }

            deleteDocument(element).then(()=>{
                getClass(thisClass.classid, dispatch)
                setDocidListMain([])
            })
        });
    }

    return (
        <>
            {isFetching ? <Loading /> : <Wrapper>
                <div className="header">
                    <button className="btn" onClick={() => setIsVisible(true)}>
                        Chỉnh sửa
                    </button>
                    {
                        docidlistMain.length > 0 &&
                        <button className="btn-delete" onClick={handleMultipleDelete}>
                            <DeleteOutlined />
                            Xóa
                        </button>
                    }
                </div>
                <div className="body">
                    {thisClass.documents?.filter(doc => doc.privacy !== true).length === 0 ? <div className="center"><InboxOutlined /></div> :
                        <Table>
                            <TableHeader>
                                <td>
                                    {/* <CheckBox
                                    img={imgMinus}
                                /> */}
                                </td>
                                <td>STT</td>
                                <td>Tên tài liệu</td>
                                <td>Ngày đăng</td>
                                <td></td>
                            </TableHeader>
                            <TableBody>
                                {

                                    thisClass.documents?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td> <CheckBox
                                                img={imgArtwork}
                                                onChange={(e) => {
                                                    if (e.checked) {
                                                        setDocidListMain([...docidlistMain, item.id])
                                                    } else {
                                                        setDocidListMain(docidlistMain.filter(i => i !== item.id))

                                                    }

                                                }} />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.posting_date}</td>
                                            <td className="tbl-icon"><EyeOutlined onClick={() => window.open(`http://localhost:3000/view-document/${item.docid}`)} />
                                                <DeleteOutlined onClick={() => {
                                                    dispatch(setIsDeleteForm(true))
                                                    setDeleteid(item.id)
                                                }} /></td>
                                        </tr>))
                                }
                            </TableBody>


                        </Table>}
                </div>

                <Modal isVisible={isVisible}>
                    <div className="modal">
                        <div className="modal-header">
                            <span className="title">THÊM TÀI LIỆU</span>
                            <div className="close" onClick={() => setIsVisible(false)}><CloseOutlined /></div>
                        </div>
                        <div className="modal-body">
                            {myDoc.length === 0 ? <div className="center"><InboxOutlined /></div> :
                                <Table>
                                    <TableHeader>
                                        <td>
                                            {/* <CheckBox
                                        img={imgMinus}
                                    /> */}
                                        </td>
                                        <td>STT</td>
                                        <td>Tên tài liệu</td>
                                        <td>Ngày đăng</td>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            myDoc?.map((item, index) => (
                                                <tr key={item.docid}>
                                                    <td> <CheckBox
                                                        img={imgArtwork}
                                                        onChange={(e) => {
                                                            if (e.checked) {
                                                                setDocidList([...docidlist, item.docid])
                                                            } else {
                                                                setDocidList(docidlist.filter(i => i !== item.docid))

                                                            }

                                                        }} /></td>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.posting_date}</td>
                                                </tr>))
                                        }
                                    </TableBody>


                                </Table>}
                        </div>
                        <div className="modal-footer">
                            <Button secondaryStyle={true} className="close" onClick={() => setIsVisible(false)}>Hủy</Button>
                            <Button disabled={docidlist.length === 0} onClick={handleDone}>Hoàn tất</Button>
                        </div>
                    </div>
                </Modal>
                <ModalDelete content={"Bạn có chắc chắc muốn xóa tài liệu này?"} onOK={handleDelete} />
            </Wrapper>}
        </>
    )
}

export default DocumentListInClass

const Wrapper = styled.div`
    .body{
        margin-top:16px;
    }
    .center{
        text-align: center;
        color: var(--grey);
        font-size:60px;
    }
    .header .btn{
        background:var(--primary-color);
        border-radius: 12px;
        border: none;
        height: 38px;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        width:150px ;
        cursor: pointer;

    }
    .btn-delete{
        font-weight: 600;
        background-color: #fff;
        color: red;
        border: none;
        cursor: pointer;
        span{
            font-size:16px ;
            margin-left:1rem;
            margin-right: 0.25rem;
        }
       
    }
`

const Modal = styled.div`
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