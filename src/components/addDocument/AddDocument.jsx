import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import SelectSearch, { fuzzySearch } from 'react-select-search'
import { Wrapper } from './AddDocumentStyle'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import { getDocuments, getMyDocuments, getSubjects, uploadDocument } from '../../redux/apiCalls'
import { setIsAddDocumentOpen } from '../../redux/slices/documentSlice'
import Button from '../Button'
import { useLocation } from 'react-router-dom'

const AddDocument = (props) => {

    const { pathname } = useLocation()

    const isAddDocumentOpen = useSelector(state => state.document.isAddDocumentOpen)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const subjects = useSelector(state => state.subject.subjects)
    const [file, setFile] = useState(null)
    const [subId, setSubId] = useState(null)
    const [docName, setDocName] = useState("")
    const [progress, setProgress] = useState(null)

    const options = subjects?.map((subject) => (
        {
            name: subject.name,
            value: subject.subid
        }
    ))

    const handleAccepFile = (e) => {
        setFile(e[0])

    }


    // useEffect(() => {
    //     getSubjects(dispatch)
    // }, [])


    const handleUpload = () => {
        if (docName === "" || subId === null || file === null) {
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
                    // console.log('Upload is ' + progress + '% done');
                    setProgress(progress)
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
                        dispatch(setIsAddDocumentOpen(false))
                        const doc = {
                            name: docName,
                            posting_date: new Date(Date.now()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),
                            lectureid: user.lectureid,
                            subid: subId,
                            privacy: true,
                            url: downloadURL,
                            type: file.name.split('.')[1],
                            firebase_name: fileName
                        }
                        uploadDocument(doc, dispatch).then(() => {
                            setProgress(null)
                            setFile(null)
                            setSubId(null)
                            setDocName("")
                            if (pathname === '/document-list') {
                                getDocuments({
                                    page: 1,
                                    privacy: 1
                                }, dispatch)
                            } else {
                                getDocuments({
                                    lectureid: user.lectureid,
                                    page: 1
                                }, dispatch)
                            }
                        })
                    });
                }
            );
        }
    }

    return (
        <Wrapper isVisible={isAddDocumentOpen}>
            <div className="modal">
                <div className="modal-header">
                    <span className="title">THÊM TÀI LIỆU</span>
                    <div className="close" onClick={() => dispatch(setIsAddDocumentOpen(false))}><CloseOutlined /></div>
                </div>
                {
                    progress === null ?
                        <div className="modal-body">
                            <div className="input-group">
                                <p className="input-title">Tên tài liệu</p>
                                <input type="text" placeholder="Nhập tên tài liệu" onChange={(e) => setDocName(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <p className="input-title">Môn học</p>
                                <SelectSearch
                                    options={options}
                                    search
                                    value={subId}
                                    placeholder="Chọn môn học"
                                    filterOptions={fuzzySearch}
                                    // onChange={setSubId}
                                    onChange={setSubId}
                                />
                            </div>


                            <Dropzone onDrop={(e) => handleAccepFile(e)}>
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
                        </div> : 
                        <div className="modal-body">
                            <div className="progress-bar">
                                <div style={{height: '100%', background:"var(--primary-color)", width:`${progress}%`, borderRadius:"8px"}}></div>
                            </div>
                        </div>
                 }
                <div className="modal-footer">
                    <Button secondaryStyle={true}>Hủy</Button>
                    {progress === null && <Button onClick={handleUpload}>Hoàn tất</Button>}
                </div>
            </div>
        </Wrapper>
    )
}

export default AddDocument