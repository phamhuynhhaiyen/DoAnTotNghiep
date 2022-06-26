import { CloseOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddStudentModal } from '../redux/slices/studentSlice'
import CheckBox from './Checkbox'
import Pagination from './Pagination'
import Table, { TableBody, TableHeader } from './Table'
import Button from './Button'
import imgArtwork from '../assets/artwork.svg'
import SearchInput from './SearchInput'
import Filter from './Filter'
import { publishRequest } from '../redux/requesMethod'
import { getClass } from '../redux/apiCalls'



const AddListStudent = (props) => {
    const dispatch = useDispatch()
    const [students, setStudents] = useState([])
    const isAddStudentModal = useSelector(state => state.student.isAddStudentModal)
    const thisClass = useSelector(state => state.class.thisClass)

    const pageNumberLimit = students.totalPages
    const [maxPageLimit, setMaxPageLimit] = useState(students.totalPages);
    const [minPageLimit, setMinPageLimit] = useState(0);

    const [currentPage, setCurrentPage] = useState(1)

    const [selectedlst, setSelectedlst] = useState([])


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
    const getStudents = async (req) => {
        try {
            const res = await publishRequest.post(`/classes/student-for-add`, req)
            setStudents(res.data)
        } catch (error) {
            

        }
    }

    useEffect(() => {
        
        getStudents({
            classid: thisClass.classid,
            page: currentPage
        });
    }, [currentPage]);

    const handleDone = () => {
        const AddStudent = async (req) => {
            try {
                const res = await publishRequest.post(`/classes/student/add`, req)
            } catch (error) {
                
            }
        }
        AddStudent({
            classid: thisClass.classid,
            studentidList: selectedlst
        }).then(()=>{
            dispatch(setIsAddStudentModal(false))
            getClass(thisClass.classid, dispatch)
            setSelectedlst([])
            getStudents({
                classid: thisClass.classid,
                page: 1
            });
        })

    }

    return (
        <Wrapper isVisible={isAddStudentModal}>
            <div className="modal">
                <div className="modal-header">
                    <span className="title">THÊM SINH VIÊN</span>
                    <div className="close" onClick={() => dispatch(setIsAddStudentModal(false))}><CloseOutlined /></div>
                </div>
                <div className="modal-body">
                    <PageHeader>
                        <SearchInput height={"38px"} placeholder="Tìm kiếm" width="436px" />
                    </PageHeader>
                    <FilterWrapper>

                        <Filter title="Khóa" value={"Tất cả"}>
                            {/* <div onClick={() => {
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
                            } */}
                        </Filter>
                    </FilterWrapper>
                    <Table>
                        <TableHeader>
                            <td></td>
                            <td>STT</td>
                            <td>Mã sinh viên</td>
                            <td>Tên</td>
                            <td>Khóa</td>
                        </TableHeader>
                        <TableBody>
                            {students.data?.map((item, index) => (
                                <tr key={item.studentid}>
                                    <td>
                                        <CheckBox
                                            img={imgArtwork}
                                            checked={selectedlst.includes(item.studentid)}
                                            onChange={(e) => {
                                                if (e.checked) {
                                                    setSelectedlst([...selectedlst, item.studentid])
                                                } else {
                                                    setSelectedlst(selectedlst.filter(i => i !== item.studentid))
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>{currentPage === 1 ? index + 1 : (index + 1) + 10 * currentPage - 10}</td>
                                    <td>{item.studentid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.grade}</td>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination currentPage={currentPage} response={students}
                        onPrevClick={onPrevClick}
                        onNextClick={onNextClick}
                        onPageChange={onPageChange} />
                </div>
                <div className="modal-footer">
                    <Button height={"38px"} secondaryStyle={true} onClick={() => dispatch(setIsAddStudentModal(false))}>Hủy</Button>
                    <Button height={"38px"} onClick={handleDone}>Hoàn tất</Button>
                </div>
            </div>
        </Wrapper>
    )
}

export default AddListStudent

const Wrapper = styled.div`
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
            padding: 1.5rem 2rem;
            display: flex;
            justify-content:space-between;
            font-size: 16px;
            border-bottom: 1px solid var(--primary-bg);

            .title{
                font-weight: 600;
                text-transform: uppercase;
            }
            .close{
                color: var(--light-grey);
                cursor: pointer;
            }
        }

        &-body{
            padding: 1rem 2rem;     
            padding-bottom: 0;
                  
            .input-group{
                margin-bottom: 16px;

                p{
                    margin-bottom: 9px;
                }

                input{
                    border: var(--primary-bg) 1px solid;
                    border-radius: 12px;
                    height: 48px;
                    width: 100%;
                    padding:16px;
                }
            }
        }

        &-footer{
            border-top: 1px solid var(--primary-bg);
            padding: 1rem 2rem;
            display: flex;
            gap: 2rem;
            justify-content:center;
        }
    }
`

const PageHeader = styled.div`
    display: flex;
    justify-content:space-between;
    
`

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`