import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { setIsDeleteForm } from '../redux/slices/actionSlice'
import { CloseOutlined } from '@ant-design/icons'
import Button from './Button'

const ModalDelete = props => {
  const isDeleteForm = useSelector(state => state.action.isDeleteForm)
  const dispatch = useDispatch()
  return (
    <DeleteForm isVisible={isDeleteForm}>
              <div className="modal">
                <div className="modal-header">
                  <span className="title">CẢNH BÁO</span>
                  <div className="close" onClick={() => dispatch(setIsDeleteForm(false))}><CloseOutlined /></div>
                </div>
                <div className="modal-body">
                  <p>{props.content}</p>
                </div>
                <div className="modal-footer">
                  <Button secondaryStyle={true} onClick={() => dispatch(setIsDeleteForm(false))}>Hủy</Button>
                  <Button onClick={props.onOK}>Xóa</Button>
                </div>
              </div>
    </DeleteForm>
  )
}

ModalDelete.propTypes = {
  onOK: PropTypes.func,
  content: PropTypes.string
}

export default ModalDelete

const DeleteForm = styled.div`
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