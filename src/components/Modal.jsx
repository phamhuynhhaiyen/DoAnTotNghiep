import React from 'react'
import PropTypes from 'prop-types'
import { CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Button from './Button'

const Modal = props => {
  return (
    <Wrapper isVisible={props.isVisible}>
            <div className="modal">
                <div className="modal-header">
                    <span className="title">{props.title}</span>
                    <div className="close" onClick={props.onClose ? () => props.onClose() : null}><CloseOutlined /></div>
                </div>
                <div className="modal-body">
                   {props.children}
                </div>
                <div className="modal-footer">
                    <Button secondaryStyle={true} onClick={props.onClose ? () => props.onClose() : null}>Hủy</Button>
                    <Button onClick={props.onOK ? () => props.onOK() : null}>Hoàn tất</Button>
                </div>
            </div>
        </Wrapper>
  )
}

Modal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func,
    onOK: PropTypes.func
}

export default Modal

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
                text-transform: uppercase;
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