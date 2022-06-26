import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { publishRequest } from '../redux/requesMethod';
import { setIsOpenModal } from '../redux/slices/semesterSlice';
import Filter from './Filter';
import Loading from './Loading';
import { FilterWrapper } from './studentsListInProject/StudentsListInProjectStyle';
import Table, { TableBody, TableHeader } from './Table';

const AssignmentInClass = (props) => {
    const isOpenModal = useSelector(state => state.semester.isOpenModal)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        const getAssignment = async () => {
            const res = await publishRequest.get(`/assignment?classid=${props.classid}`)
            setData(res.data)
            setIsLoading(false)
        }
        if(props.classid){
            getAssignment()
        }
        
    }, [props.classid])

    console.log(data)

    return (
        <Wrapper isVisible={isOpenModal}>
            <div className="header">
                <div className="close" onClick={() => dispatch(setIsOpenModal(false))}><CloseOutlined /></div>
                <h3 className="title">{props.name}</h3>
            </div>
            <div className="body">
                <div className="container">
                    {
                        isLoading ? <Loading /> :
                            <>
                                <Table>
                                    <TableHeader>
                                        <td>STT</td>
                                        <td>Tên</td>
                                        <td>Người nộp</td>
                                        <td>Thời gian nộp</td>
                                        <td></td>
                                    </TableHeader>
                                    <TableBody>
                                        {data?.map((item, index) => (
                                            <tr key={item.assignmentid}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.student}</td>
                                                <td>{item.posting_date}</td>
                                                <td className="tbl-icon"><EyeOutlined /></td>
                                            </tr>
                                        ))}
                                    </TableBody>
                                </Table>
                            </>
                    }
                </div>
            </div>
        </Wrapper>
    )
}

export default AssignmentInClass



const Wrapper = styled.div`
    z-index: 100;
    display: ${props => props.isVisible ? 'initial' : 'none'};
    width: 100% ;
    height: 100% ;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;

    .header{
        height: 70px;
        display: flex;
        align-items: center;
        padding: 16px;
        gap:26px;

        span{
            font-size:22px;
            cursor: pointer;
            color: var(--primary-color);
        }
        .title{
            font-size:20px;
            text-transform:uppercase;
        }
    }

    .body{
        margin: 16px;
        padding: 16px;
        margin-top: 0;
        height: calc(100vh - 86px);
        border-radius: 12px;
        background-color: var(--secondary-bg);

        .container{
            background: #fff;
            border-radius: 12px;
            height: 100%;
            padding: 16px;
        }
    }
`