import { EyeOutlined, InboxOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteReference, getClassPrev, insertReference } from '../redux/apiCalls'
import Switch from "react-switch";
import Table, { TableBody, TableHeader } from './Table'
import AssignmentInClass from './AssignmentInClass'
import { setIsOpenModal } from '../redux/slices/semesterSlice'

const LectureAssignment = () => {
    const activeRef = useRef()
    const [route, setRoute] = useState(<AssignmentList />)
    const assignmentList = () => {
        activeRef.current.classList.remove('yearly-active')
        setRoute(<AssignmentList />)
    }
    const reference = () => {
        activeRef.current.classList.add('yearly-active')
        setRoute(<Reference />)
    }

    return (
        <Wrapper>
            <div className="tool">
                <div className="switch">
                    <div className="switch__container" ref={activeRef}>
                        <span className="switch__container__monthly" onClick={assignmentList}>Sinh viên đã nộp</span>
                        <span className="switch__container__yearly" onClick={reference}>Bài tập lớn tham khảo</span>
                    </div>
                </div>
            </div>
            {route}

        </Wrapper>
    )
}

export default LectureAssignment

const AssignmentList = () => {
    const assignment = useSelector(state => state.class.assignment)
    return (
        <>
            {assignment?.length > 0 ?
                <Table>
                    <TableHeader>
                        <td>STT</td>
                        <td>Tên</td>
                        <td>Người nộp</td>
                        <td>Thời gian nộp</td>
                        <td></td>
                    </TableHeader>
                    <TableBody>
                        {assignment?.map((item, index) => (
                            <tr key={item.assignmentid}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.student}</td>
                                <td>{item.posting_date}</td>
                                <td className="tbl-icon"><EyeOutlined /></td>
                            </tr>
                        ))}
                    </TableBody>
                </Table> :
                <div style={{ textAlign: "center", color: "var(--grey)", fontSize: "60px" }}>
                    <InboxOutlined />
                    <p style={{ fontSize: "14px"}}>Chưa có sinh viên nộp</p>
                </div>
            }
        </>
    )
}
export const Reference = () => {
    const dispatch = useDispatch()
    const thisClass = useSelector(state => state.class.thisClass)
    const isOpenModal = useSelector(state => state.semester.isOpenModal)
    const [selectedClass, setSelectedClass] = useState(null)

    const reference_list = useSelector(state => state.class.reference_list)
    useEffect(() => {
        getClassPrev({
            classid: thisClass.classid,
            subid: thisClass.subid,
            semesterid: thisClass.semesterid
        }, dispatch)
    }, [thisClass])

    // console.log(reference_list)

    const handleReference = (reference) => {
        if (reference.id) {
            insertReference({
                classid: thisClass.classid,
                classid_reference: reference.classid
            }, dispatch)
        }
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <td>STT</td>
                    <td>Tên lớp</td>
                    <td>Giảng viên</td>
                    <td>Học kỳ</td>
                    <td>Môn học</td>
                    <td>Được phép xem</td>
                    <td></td>
                </TableHeader>
                <TableBody>
                    {reference_list?.map((item, index) => (
                        <tr key={item.classid}>
                            <td>{index + 1}</td>
                            <td>{item.classname}</td>
                            <td>{item.lecture}</td>
                            <td>{item.semester}</td>
                            <td>{item.subject}</td>
                            <td style={{ transform: "scale(0.7)" }}>
                                <Switch
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    onColor={"#2196F3"}
                                    offColor={"#B2BEC3"}
                                    checked={item.id}
                                    onChange={item.id ?
                                        () => deleteReference(item.id, dispatch) :
                                        () => insertReference({
                                            classid: thisClass.classid,
                                            classid_reference: item.classid
                                        }, dispatch)}
                                />
                            </td>
                            <td className="tbl-icon"><EyeOutlined onClick={() => {
                                dispatch(setIsOpenModal(true))
                                setSelectedClass(item)
                            }} /></td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
            <AssignmentInClass isVisible={isOpenModal} classid={selectedClass?.classid} name={selectedClass?.classname} />
        </>
    )
}

const Wrapper = styled.div`
    .tool{
        display: flex;
        justify-content:space-between;
        margin-bottom: 16px;

        .btn{
            height:38px;
        }
    }

    .switch{
        background: rgba(181,184,209,.3);
        padding: 0.3rem;
        border-radius:4rem;

        &__container{
            display: flex;
            position: relative;
            cursor: pointer;
            color: #707387;

            &.yearly-active{
                &:before{
                    left:50%;
                }     
                
                .switch__container__yearly{
                    color: var(--primary-color);
                }
                .switch__container__monthly{
                    color: #707387;
                }
            }

            &:before{
                content: "";
                background: #fff;
                position: absolute;
                top: 0;
                left: 0;
                width: 50%;
                height: 100%;
                z-index: 0;
                border-radius:4rem;
                transition: all 0.2s ease-in-out;
            }
    
            span{
                font-weight: 700;
                padding: 0.5rem 2rem;
                z-index: 1;
                flex: 1 1 ;
                text-align: center;
                white-space: nowrap ;
            }
            &__monthly{
                color: var(--primary-color);

            }
        }
    }
`