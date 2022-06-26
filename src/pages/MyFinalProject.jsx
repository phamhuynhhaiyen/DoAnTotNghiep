import { CloseOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Button from '../components/Button'
import Loading from '../components/Loading'
import { getMyFinalProjects } from '../redux/apiCalls'

const MyFinalProject = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector(state => state.action.isFetching)
    const myFinalProjects = useSelector(state => state.project.myFinalProjects)

    const [isSetName, setIsSetName] = useState(false)
    const [isAddDoc, setIsAddDoc] = useState(false)
    const [projectName, setProjectName] = useState()
    const [file, setFile] = useState(null)


    console.log(myFinalProjects)

    useEffect(() => {
        getMyFinalProjects(JSON.parse(localStorage.getItem("user")).username, dispatch);
    }, []);


    return (
        <>
            {
                isFetching ? <Loading /> :
                    <Wrapper>
                        {
                            myFinalProjects.map((item, index) => (
                                <Panel>
                                    <div className="header">
                                        <span>{item.semester}</span>

                                    </div>
                                    <div className="body">
                                        <p className="bold">GVHD: {item.lecture}</p>
                                        {
                                            item.projectname ? <p>Tên đề tài: {item.projectname}</p> :
                                                <p>Tên đề tài: Chưa bổ sung <EditOutlined onClick={() => setIsSetName(true)} /></p>
                                        }

                                    </div>
                                    <div className="footer">
                                        <button onClick={()=>setIsAddDoc(true)}>Nộp báo cáo</button>
                                    </div>
                                </Panel>
                            ))
                        }

                        <Modal isVisible={isSetName}>
                            <div className="modal">
                                <div className="modal-header">
                                    <span className="title">TÊN ĐỀ TÀI</span>
                                    <div className="close" onClick={() => setIsSetName(false)}><CloseOutlined /></div>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group">
                                        <p className="input-title">Tên đề tài</p>
                                        <input type="text" placeholder="Nhập tên đề tài" onChange={(e) => setProjectName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Button secondaryStyle={true} onClick={() => setIsSetName(false)}>Hủy</Button>
                                    <Button >HOÀN TẤT</Button>
                                </div>
                            </div>
                        </Modal>

                        <Modal isVisible={isAddDoc}>
                            <div className="modal">
                                <div className="modal-header">
                                    <span className="title">NỘP ĐỒ ÁN</span>
                                    <div className="close" onClick={() => setIsAddDoc(false)}><CloseOutlined /></div>
                                </div>
                                <div className="modal-body">
                                    <div className="input-group">
                                        <p className="input-title">Tên đề tài</p>
                                        <input type="text" placeholder="Nhập tên đề tài" onChange={(e) => setProjectName(e.target.value)} />
                                    </div>
                                    <Dropzone onDrop={(e) => setFile(e[0])}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                {
                                                    file === null ?
                                                        <div {...getRootProps({ className: "dropzone" })}>
                                                            <input {...getInputProps()} />
                                                            <UploadOutlined />
                                                            <p>Kéo và thả tệp vào đây, hoặc nhấn vào để chọn tệp</p>
                                                        </div> :
                                                        <div className="file-container">
                                                            <div className="close-file" onClick={() => setFile(null)}><CloseOutlined /></div>
                                                            <div className="file">
                                                                {file.name}
                                                            </div>
                                                        </div>
                                                }
                                            </section>
                                        )}
                                    </Dropzone>
                                </div>
                                <div className="modal-footer">
                                    <Button secondaryStyle={true} onClick={() => setIsAddDoc(false)}>Hủy</Button>
                                    <Button >HOÀN TẤT</Button>
                                </div>
                            </div>
                        </Modal>
                    </Wrapper>
            }
        </>
    )
}

export default MyFinalProject

const Wrapper = styled.div`
    display: flex;
`

const Panel = styled.div`
    width: 280px;
    border-radius: 12px;
    background: #FAFAFA;
    border: var(--primary-bg) 1px solid;
    padding: 10px;

    .header{
        background: #f2abc3;
        min-height: 100px;
        border-radius: 12px;
        padding:16px ;
        display: flex;
        align-items: flex-end;

        span{
            text-transform: uppercase;
            font-weight: 500;
            color: #fff;
            font-size: 20px;
        }
    }
    .body{
        margin-top:16px;
        min-height: 80px;
        

        .bold{
            font-weight: 500;
        }
        p{
            
            color: var(--grey);
            margin-bottom: 7px ;
        }
        span{
            margin-left: 0.75rem;
            cursor: pointer;
            &:hover{
                transform: scale(1.05);
                color: var(--primary-color)
            }
        }
    }

    .footer{
        border-top: var(--primary-bg) 1px solid;
        padding-top: 10px;

        button{
            background-color: #fff;
            border: 1px solid var(--primary-bg);
            border-radius:8px;
            padding: 7px 15px;
            color:var(--grey);
            text-transform: uppercase;
            font-weight: 700;
            cursor: pointer;
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
            section{
                height:120px;
                width:100%;
                border: var(--primary-bg) 1px solid;
                border-radius: 12px;
                padding:12px;

                .dropzone{
                    border: var(--primary-bg) 1px dashed;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content:center;
                    align-items:center;
                    color: var(--grey);
                    cursor: pointer;
                    border-radius: 12px;

                    .anticon{
                        font-size: 30px;
                        color: var(--primary-color);
                    }
                    p{
                        margin-top: 16px;
                    }
                }
                .file-container{
                    border: var(--primary-bg) 1px dashed;
                    height: 100%;
                    border-radius: 12px;
                    color: var(--grey);
                    
                    .close-file{
                        display: flex;
                        flex-direction: row-reverse;
                        margin: 0.75rem;
                        cursor: pointer;
                    }
                    .file{
                        width: 100%;
                        text-align: center;
                    }
                }
            }


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