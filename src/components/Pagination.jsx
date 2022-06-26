import React from 'react'
import styled from 'styled-components';

const Pagination = (props) => {
  // init
  const currentPage = props.currentPage;
  const maxPageLimit = props.response.totalPages;
  const minPageLimit = 0;

  const totalPages = props.response.totalPages;

  
    // build page numbers list based on total number of pages
    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }

    const handleNextClick = ()=>{
        props.onNextClick();
    }

    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {

        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li key={page} id={page} onClick={handlePageClick} 
            className={currentPage===page ? 'active' : null}>
            {page}
        </li>
            );
        }else{
            return null;
        }
    }
   
 );

    

    // page ellipses
    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li> 
    }

    return (
            <Wrapper> 
               <li>
                   <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Trước</button>
               </li>
               {pageDecremenEllipses}
                {pageNumbers}
               {pageIncrementEllipses}
                <li>
                   <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Sau</button>
               </li>
            </Wrapper>
    )
}

export default Pagination

const Wrapper = styled.ul`
    margin: 16px 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;


    li{
        width: 35px;
        height: 35px;
        border: 1px solid #fff;
        border-radius:6px ;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:first-child, &:last-child {
            width: auto;
            button{
                background-color: #fff;
                border: none;
                font-family: "Roboto";
                font-size: 14px;
                cursor: pointer;
            }
        }
        &:first-child {
            margin-right: 16px;
        }
        &:last-child {
            margin-left: 16px;
        }
    }

    li.active {
        background-color: var(--primary-color);
        color: #fff;

    }
`