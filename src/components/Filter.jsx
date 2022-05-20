import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DownOutlined } from '@ant-design/icons'


const Filter = props => {

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  return (
    <Wrapper>
      <span className="title">{props.title}</span>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          <span>Tất cả</span>
          <DownOutlined/>
        </DropDownHeader>
          {/* <DropDownListContainer isOpen={isOpen}>
            <DropDownList>
              <ListItem>Mangoes vcvdv</ListItem>
              <ListItem>Apples</ListItem>
              <ListItem>Oranges</ListItem>
            </DropDownList>
          </DropDownListContainer> */}
      </DropDownContainer>
    </Wrapper>
  )
}

Filter.propTypes = {
  title: PropTypes.string,
  dataOptions: PropTypes.array
}

export default Filter

const Wrapper = styled.div`
  display: flex;
  gap:0.5rem;
  padding: 0.5rem 0;

  .title{
    color: var(--light-grey);
  }
`

const DropDownContainer = styled.div`
  
  margin: 0 auto;
`

const DropDownHeader = styled.div`
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center ;
  width: 4rem;

  .anticon{
    font-size: 11px;
  }
`

const DropDownListContainer = styled.div`
  display: ${props => props.isOpen ? 'initial' : 'none'};
  position: absolute
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  &:first-child {
    padding-top: 0.8em;
  }
`

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
`