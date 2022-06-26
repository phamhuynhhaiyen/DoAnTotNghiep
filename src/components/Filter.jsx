import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { DownOutlined } from '@ant-design/icons'


const Filter = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  
  return (
    <Wrapper>
      <span className="title">{props.title}</span>
      <DropDownContainer ref={ref}>
        <DropDownHeader onClick={toggling}>
          <span>{props.value}</span>
          <DownOutlined/>
        </DropDownHeader>
          <DropDownListContainer isOpen={isOpen}>
            {props.children}
          </DropDownListContainer>
      </DropDownContainer>
    </Wrapper>
  )
}



export default Filter

export const DropdownItem = (props)=>(
  <ListItem>
    {props.children}
  </ListItem>
)

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
  cursor: pointer;

  .anticon{
    font-size: 11px;
    margin-left:0.5rem ;
  }
`

const DropDownListContainer = styled.div`
  display: ${props => props.isOpen ? 'initial' : 'none'};
  position: absolute;
  padding: 0;
  margin-top: 0.25rem;
  background: #ffffff;
  border: 1px solid var(--primary-bg);
  border-radius: 4px;
`

const ListItem = styled.li`
  list-style: none;
  padding: 0.8em;
  &:hover {
    cursor: pointer;
    background-color: var(--grey-bg);
  }
`