import { CaretDownOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import Loading from './Loading'
import SearchInput from './SearchInput'
import Table, { TableBody, TableHeader } from './Table'
import { SheetJSFT } from '../excel/types';
import * as XLSX from "xlsx";
import { make_cols } from '../excel/MakeColumns';
import Modal from '../components/Modal'
import CheckBox from './Checkbox'
import imgArtwork from '../assets/artwork.svg'
import ModalDelete from './ModalDelete'
import { setIsDeleteForm } from '../redux/slices/actionSlice'
import { getAllStudents, getClass } from '../redux/apiCalls'
import { publishRequest } from '../redux/requesMethod'
import Pagination from './Pagination'
import { setIsAddStudentModal } from '../redux/slices/studentSlice'
import AddListStudent from './AddListStudent'

const StudentListInClass = () => {
    // const { classid } = useParams()
    const dispatch = useDispatch()
    // const [isLoading, setIsLoading] = useState(true)
    const ref = useRef(null);
    const isFetching = useSelector(state => state.action.isFetching)
    const thisClass = useSelector(state => state.class.thisClass)
    const [studentlst, setStudentLst] = useState([])
    const tblHeader = ["STT", "Mã sinh viên", "Tên", "Khóa", ""]
    const [page, setPage] = useState(0)
    const [data, setData] = useState([])
    const [cols, setCols] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [file, setFile] = useState([])
    const [selectedlst, setSelectedlst] = useState([])
    const [deleteid, setDeleteid] = useState(null)
    const [multipleDelete, setMultipleDelete] = useState(false)
    const [isOpen, setIsOpen] = useState(false);


    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const res = [];
        for (let i = 0; i < thisClass.students.length; i += 10) {
            const chunk = thisClass.students.slice(i, i + 10);
            res.push(chunk);
        }

        setStudentLst(res)
        // setIsLoading(false);
    }, [isFetching])

    const handleImportFile = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            setFile(files[0])
        }
        if (file) {
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;

            reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws);
                /* Update state */
                setData(data)
                setCols(make_cols(ws['!ref']));
            };

            if (rABS) {
                reader.readAsBinaryString(files[0]);
            } else {
                reader.readAsArrayBuffer(files[0]);
            };
        }


    }


    useEffect(() => {
        if (data.length > 0) {
            setIsAdd(true);
        }
    }, [data])



    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const handleDelete = () => {

        const deleteStudent = async (id) => {
            try {
                const res = await publishRequest.get(`/classes/delete/student/${id}`)
            } catch (error) {
                console.log(error)
            }
        }
        deleteStudent(deleteid).then(() => {
            getClass(thisClass.classid, dispatch)
            dispatch(setIsDeleteForm(false))
        })
    }

    const handleMultipleDelete = () => {
        selectedlst.forEach(element => {
            const deleteStudent = async (id) => {
                try {
                    const res = await publishRequest.get(`/classes/delete/student/${id}`)
                } catch (error) {
                    console.log(error)
                }
            }

            deleteStudent(element)
        });
        getClass(thisClass.classid, dispatch)
        setSelectedlst([])
        dispatch(setIsDeleteForm(false))
    }
    useEffect(() => {
        getAllStudents({
            //   name: searchname,
            //   grade: grade,
            page: 1
        }, dispatch);
    }, []);


    const handleAddFromExcel = () => {
        let student = []
        data.forEach(element => {
            student.push(element.studentid)
        });
        const AddStudent = async (req) => {
            try {
                const res = await publishRequest.post(`/classes/student/add`, req)
            } catch (error) {
                
            }
        }
        AddStudent({
            classid: thisClass.classid,
            studentidList: student
        }).then(()=>{
            setIsAdd(false)
            setData([])
            getClass(thisClass.classid, dispatch)
            
        })
    }

    return (
        <>
            {
                isFetching ? <Loading /> :
                    <>
                        <PageHeader>
                            <SearchInput placeholder="Tìm kiếm" width="436px" />
                            <div className="btn-group">
                                {
                                    selectedlst.length > 0 &&
                                    <button className="btn-delete" onClick={() => {
                                        setMultipleDelete(true)
                                        dispatch(setIsDeleteForm(true))

                                    }}>
                                        <DeleteOutlined />
                                        Xóa
                                    </button>
                                }
                                <button className="btn-excel">
                                    Thêm từ file Excel
                                    <div className="file-wrap">
                                        <input type="file"
                                            accept={SheetJSFT}
                                            onChange={(event) => handleImportFile(event)}
                                            onClick={(event) => { event.target.value = null }} />
                                    </div>
                                    <div className="arrow" onClick={() => setIsOpen(!isOpen)}>
                                        <CaretDownOutlined />
                                    </div>
                                    <DropDownListContainer ref={ref} isOpen={isOpen} onClick={() => window.open("https://firebasestorage.googleapis.com/v0/b/node-api-e5128.appspot.com/o/1655913332274Format_AddStudentInClass.xlsx?alt=media&token=7fb9db9b-1173-431b-9e28-c2e9e584b50a")}>
                                        Tải mẫu
                                    </DropDownListContainer>
                                </button>

                                <Button onClick={() => dispatch(setIsAddStudentModal(true))}>Thêm sinh viên</Button>
                            </div>
                        </PageHeader>
                        <Table>
                            <TableHeader>
                                <td>
                                    {/* <CheckBox 
                                    img={imgMinus}
                                    checked={true}
                                    /> */}
                                </td>
                                {tblHeader.map((item, index) => (<td key={index}>{item}</td>))}
                            </TableHeader>
                            <TableBody>
                                {studentlst[page]?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>
                                            <CheckBox
                                                img={imgArtwork}
                                                checked={selectedlst.includes(item.id)}
                                                onChange={(e) => {
                                                    if (e.checked) {
                                                        setSelectedlst([...selectedlst, item.id])
                                                    } else {
                                                        setSelectedlst(selectedlst.filter(i => i !== item.id))
                                                    }
                                                }}
                                            // checked={true}
                                            />
                                        </td>
                                        <td>{page === 0 ? index + 1 : (index + 1) + 20 * page - 10}</td>
                                        <td>{item.studentid}</td>
                                        <td>{item.studentname}</td>
                                        <td>{item.grade}</td>
                                        <td className="tbl-icon">
                                            <DeleteOutlined onClick={() => {
                                                dispatch(setIsDeleteForm(true))
                                                setDeleteid(item.id)
                                            }} />
                                        </td>
                                    </tr>
                                ))}
                            </TableBody>

                        </Table>
                        <Paginate>
                            <button disabled={page === 0} onClick={() => setPage(page - 1)}>Trước</button>
                            {

                                studentlst.map((_, index) => <li className={page === index ? 'active' : undefined} onClick={() => setPage(index)}>{index + 1}</li>)
                            }
                            <button disabled={page === studentlst.length - 1} onClick={() => setPage(page + 1)}>Sau</button>
                        </Paginate>
                    </>
            }
            <Modal isVisible={isAdd}
                title="Xác nhận"
                onClose={() => {
                    setIsAdd(false)
                    setData([])
                }}
                onOK={handleAddFromExcel}
            >
                <div style={{ fontSize: "15px", textAlign: "center" }}>
                    Bạn có chắc chắn thêm <span style={{ fontWeight: '600', color: 'red' }}>{data.length}</span> sinh viên vào lớp học?
                </div>
            </Modal>

            <ModalDelete
                content={multipleDelete ? "Bạn có chắc chắc muốn xóa các sinh viên này ra khỏi lớp học?" : "Bạn có chắc chắc muốn xóa sinh viên này ra khỏi lớp học?"}
                onOK={multipleDelete ? handleMultipleDelete : handleDelete} />

            <AddListStudent/>
        </>
    )
}

export default StudentListInClass

const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
  margin-bottom: 16px;

  .btn-group{
      display: flex;
      gap:10px;
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

  .arrow{
      width: 20px;
      height: 20px;
      border-radius: 2px;      
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover{
        background-color: rgba(7, 7, 7, 0.5);
        cursor: pointer;
      }
  }


  .file-wrap{
    width: 85%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .btn-excel{
    background: #1D6F42;
    border-radius: 12px;
    border: #1D6F42 1.4px solid;
    height: 48px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    width: 180px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    input[type="file"]{
        cursor: pointer;
        /* position: absolute;
        top: 0;
        left: 0; */
        width:100%;
        height: 100%;
        opacity: 0
    }
  }
  
`

const Paginate = styled.div`
    display: flex;
    justify-content:flex-end;
    margin: 16px 0;
    gap: 0.75rem;
    
    button{
        border:none ;
        background: #fff;
        font-size: 14px;
        cursor: pointer;
    }

    li{
        list-style: none;
        width: 35px;
        height: 35px;
        border: 1px solid #fff;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &.active{
            background-color: var(--primary-color);
            color: #fff;
        }
    }
`

const DropDownListContainer = styled.div`
  display: ${props => props.isOpen ? 'initial' : 'none'};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0.75rem 0.5rem;
  margin-top: 0.25rem;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid var(--primary-bg);
  border-radius: 8px;
  font-weight: 400;
  text-transform: none;
  cursor: pointer;
`