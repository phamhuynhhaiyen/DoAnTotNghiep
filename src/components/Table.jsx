import React from 'react'
import styled from 'styled-components'

const Table = (props) => {

  return (
    <>
      <TableWrapper>
        {props.children}
      </TableWrapper>
    </>
  )
}

export default Table


export const TableHeader = (props) => (
  <thead>
    <tr className="table-header">
      {props.children}
    </tr>
  </thead>
)

export const TableBody = (props) => (
  <tbody>
    {props.children}
  </tbody>
)

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr{
    width: 100%;
    td{
      padding: 0.8rem;

      &:first-child {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
      }
      &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }
    }
  }
  tbody{
    tr:nth-child(even) {
      background: var(--grey-bg);
    }
      /* tr:hover {
        
        td{
          transform: scale(1.05);
        }
      } */

    .tbl-icon{
      display: flex;
      gap: 0.5rem;
        

      span{
        font-size:16px;
        cursor: pointer;

        &:hover{
          transform: scale(1.05);
          color: var(--primary-color)
        }
      }

        
      }
  }
  

  .table-header {
    background: var(--primary-bg);
    font-weight: 700;
  }
`