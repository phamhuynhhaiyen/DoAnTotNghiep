import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Pagination from './Pagination';

const Table = (props) => {

  const pageNumberLimit = 5;
  const [passengersData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  useEffect(()=>{
    setLoading(true);
    fetch(`https://api.instantwebtools.net/v1/passenger?currentPage=${currentPage}&size=5`)
    .then((response) => response.json())
    .then((json) => { setData(json); setLoading(false);});
    
  },[currentPage]);

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: passengersData,
  };
  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage(prev => prev - 1);
  }
  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage(prev => prev + 1);
  }
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const tableHeader = props.tableHeader

  const tableBody = props.tableBody

  return (
    <>
      <TableWrapper>
        <thead>
          <tr class="table-header">
            {tableHeader.map((item, index)=>(
              <td key={index}>{item}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Tin học đại cương</td>
            <td>11/04/2022</td>
            <td>Phạm Văn A</td>
          </tr>
        </tbody>
      </TableWrapper>
      <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}/>
      
    </>
  )
}

export default Table

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
  }
  

  .table-header {
    background: var(--primary-bg);
    font-weight: 700;
  }
`