import { EyeOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDocPublic } from '../redux/apiCalls'
import SearchInput from './SearchInput'
import Table, { TableBody, TableHeader } from './Table'

const StudentClassDoc = () => {
    const activeRef = useRef()
    const thisClass = useSelector(state => state.class.thisClass)
    const doc_public = useSelector(state => state.class.doc_public)

    const dispatch = useDispatch()
    const [documents, setDocuments] = useState([])
    const privateDoc = () => {
        activeRef.current.classList.remove('yearly-active')
        setDocuments(thisClass.documents_private)
    }

    const publicDoc = () => {
        activeRef.current.classList.add('yearly-active')
        setDocuments(doc_public)
    }
    useEffect(() => {
        getDocPublic(thisClass.subid, dispatch)
        setDocuments(thisClass.documents_private)
    },[thisClass])
    return (
        <Wrapper>
            <div className="tool">
                <div className="switch">
                    <div className="switch__container" ref={activeRef}>
                        <span className="switch__container__monthly" onClick={privateDoc}>Riêng tư</span>
                        <span className="switch__container__yearly" onClick={publicDoc}>Công khai</span>
                    </div>
                </div>
                <SearchInput placeholder="Tìm kiếm" width="436px" height="38px" />
            </div>
            <Table>
                <TableHeader>
                    <td>STT</td>
                    <td>Tên tài liệu</td>
                    <td>Ngày đăng</td>
                    <td>Người đăng</td>
                    <td></td>
                </TableHeader>
                <TableBody>
                    {documents?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.posting_date}</td>
                            <td>{item.lecture ?  item.lecture : thisClass.lecture}</td>
                            <td className="tbl-icon"><EyeOutlined onClick={() => window.open(`http://localhost:3000/view-document/${item.docid}`)} /></td>
                        </tr>))}
                </TableBody>

            </Table>
        </Wrapper>
    )
}

export default StudentClassDoc

const Wrapper = styled.div`
    .tool{
        display: flex;
        justify-content:space-between;
        margin-bottom: 16px;
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