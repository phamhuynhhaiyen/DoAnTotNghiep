import { CloseOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'
import { addAssignment } from '../redux/apiCalls'
import { publishRequest } from '../redux/requesMethod'
import Button from './Button'
import Table, { TableBody, TableHeader } from './Table'

const StudentAssignment = () => {
    const activeRef = useRef()
    const [route, setRoute] = useState(<MyAssignment />)
    const myAssignment = () => {
        activeRef.current.classList.remove('yearly-active')
        setRoute(<MyAssignment />)
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
                        <span className="switch__container__monthly" onClick={myAssignment}>Của bạn</span>
                        <span className="switch__container__yearly" onClick={reference}>Tham khảo</span>
                    </div>
                </div>
                {/* <SearchInput placeholder="Tìm kiếm" width="436px" height="38px" /> */}
            </div>
            {route}

        </Wrapper>
    )
}

export default StudentAssignment

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

const Assignment = styled.div`
    .submit{
        width: 100px;
        height: 100px;
        border-radius: 12px;
        border: 2px solid var(--primary-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: var(--primary-color);
        gap:0.5rem;
        cursor: pointer;

        span{
            font-size: 30px;
        }
        p{
            font-weight: 500;
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
    z-index:5;
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

export const MyAssignment = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [file, setFile] = useState(null)
    const [docName, setDocName] = useState("");
    const assignment = useSelector(state => state.class.assignment)
    const user = JSON.parse(localStorage.getItem("user"))
    const thisClass = useSelector(state => state.class.thisClass)
    const dispatch = useDispatch()


    const handleDone = () => {
        if (docName === "" || file === null) {
            alert("Vui lòng nhập đủ thông tin!")
        } else {
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('Available', downloadURL);

                        const data = {
                            classid: thisClass.classid,
                            name: docName,
                            url: downloadURL,
                            studentid: user.username,
                            posting_date: new Date(Date.now()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),
                        }

                        addAssignment(data, dispatch).then(() => {
                            setIsVisible(false)
                        })
                    });
                }
            );
        }
    }

    return (
        <Assignment>
            {assignment.length === 0 ?
                <div className="submit" onClick={() => setIsVisible(true)}>
                    <PlusOutlined />
                    <p>Nộp bài</p>
                </div> :
                <Table>
                    <TableHeader>
                        <td>Tên</td>
                        <td>Ngày nộp</td>
                        <td></td>
                    </TableHeader>
                    <TableBody>
                        <tr >
                            <td>{assignment[0].name}</td>
                            <td>{assignment[0].posting_date}</td>
                            <td className="tbl-icon">
                                <EyeOutlined />
                                <EditOutlined />
                                <DeleteOutlined />
                            </td>
                        </tr>
                    </TableBody>
                </Table>
            }
            <Modal isVisible={isVisible}>
                <div className="modal">
                    <div className="modal-header">
                        <span className="title">NỘP BÀI TẬP LỚN</span>
                        <div className="close" onClick={() => setIsVisible(false)}><CloseOutlined /></div>
                    </div>
                    <div className="modal-body">
                        <div className="input-group">
                            <p className="input-title">Tên bài tập lớn</p>
                            <input type="text" placeholder="Nhập tên bài tập lớn" onChange={(e) => setDocName(e.target.value)} />
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
                        <Button secondaryStyle={true} onClick={() => setIsVisible(false)}>Hủy</Button>
                        <Button onClick={handleDone}>Hoàn tất</Button>
                    </div>
                </div>
            </Modal>
        </Assignment>
    )
}

export const Reference = () => {
    const thisClass = useSelector(state => state.class.thisClass)

    // console.log(thisClass.references)
    return (
        <Table>
            <TableHeader>
                <td>STT</td>
                <td>Tên lớp học</td>
                <td>Giảng viên</td>
                <td>Học kỳ</td>
                <td></td>
            </TableHeader>
            <TableBody>
                {
                    thisClass.references?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.classname}</td>
                            <td>{item.lecture}</td>
                            <td>{item.semester}</td>
                            <td className="tbl-icon"><EyeOutlined /></td>
                        </tr>
                    ))
                }
            </TableBody>
        </Table>
    )
}