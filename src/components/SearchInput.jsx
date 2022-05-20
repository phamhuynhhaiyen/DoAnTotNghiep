import React from 'react'
import PropTypes from 'prop-types'
import { SearchOutlined, SlidersOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const SearchInput = props => {
  return (
    <Wrapper width={props.width} filterIcon={props.filterIcon}>
        <SearchOutlined />
        <input placeholder={props.placeholder}/>    
        <div className="filter-icon">
            <SlidersOutlined />
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`     
    width: ${props => props.width};
    background: var(--grey-bg);
    border: var(--primary-bg) 1px solid;
    border-radius: 12px;
    height: 48px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    font-size: 18px;
    color: var(--light-grey);

    input{
        border: none;
        background: var(--grey-bg);
        width: 100% ;
    }

    .filter-icon{
        display: ${props => props.filterIcon ? null : 'none'};
        background: var(--primary-bg);
        border-radius: 12px;
        padding:5px 7px;
        cursor: pointer;
        color: var(--primary-color);
    }
`

SearchInput.propTypes = {
    width: PropTypes.string,
    onchange: PropTypes.func,
    placeholder: PropTypes.string,
    filterIcon: PropTypes.bool
}

export default SearchInput