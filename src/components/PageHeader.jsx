import { FolderOpenOutlined, RightOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'

const PageHeader = () => {
  return (
    <Wrapper>
        <span className="title">Tài liệu</span>
        <div className="breadcrumbs">
            <div className="nav-icon">
                <FolderOpenOutlined />
            </div>
            <div className="nav-item">Tài liệu</div>
            <div className="nav-separator"><RightOutlined /></div>
            <div className="nav-item">Tài liệu của bạn</div>
        </div>

    </Wrapper>
  )
}

export default PageHeader

const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
    background: #FFFFFF;
    border-radius: 12px;
    align-items: center;
    height: 58px;
    padding:16px;
    margin-bottom: 16px;

    .title{
        font-size: 16px;
        font-weight: 500;

    }

    .breadcrumbs{
        display: flex;
        gap: 10px;
        font-size: 12px;
        color: var(--dark-grey);
        font-weight: 500;
    }
`