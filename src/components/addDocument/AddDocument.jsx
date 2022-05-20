import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { setIsAddDocumentOpen } from '../../redux/slices/documentSlice'
import Button from '../Button'

const AddDocument = (props) => {

    const isAddDocumentOpen = useSelector(state => state.document.isAddDocumentOpen)
    const dispatch = useDispatch()

    const { getRootProps, getInputProps } = useDropzone()
    return (
        <Wrapper isVisible={isAddDocumentOpen}>
            <div className="modal">
                <div className="modal-header">
                    <span className="title">THÊM TÀI LIỆU</span>
                    <div className="close" onClick={()=> dispatch(setIsAddDocumentOpen(false))}><CloseOutlined /></div>
                </div>
                <div className="modal-body">
                    <div className="input-group">
                        <p className="input-title">Tên tài liệu</p>
                        <input type="text" placeholder="Nhập tên tài liệu" />
                    </div>
                    <div className="input-group">
                        <p className="input-title">Môn học</p>
                        <input type="text" placeholder="Chọn môn học" />
                    </div>

                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <UploadOutlined />
                                        <p>Kéo và thả tệp vào đây, hoặc nhấn vào để chọn tệp</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className="modal-footer">
                    <Button secondaryStyle={true}>Hủy</Button>
                    <Button>Hoàn tất</Button>
                </div>
            </div>
        </Wrapper>
    )
}

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

export default AddDocument