import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import AddDocument from '../components/addDocument/AddDocument'
import { setIsAddDocumentOpen } from '../redux/slices/documentSlice'
import Button from '../components/Button'
import Filter from '../components/Filter'
import SearchInput from '../components/SearchInput'
import Table from '../components/Table'

const DocumentList = () => {
  
  const isAddDocumentOpen = useSelector(state => state.document.isAddDocumentOpen)
  const dispatch = useDispatch()

  const docHeader = ["STT","Tên tài liệu", "Ngày đăng", "Người đăng"]

  return (
    <>
      <PageHeader>
        <SearchInput placeholder="Tìm kiếm" width="436px"/>
        <Button 
        onClick={() => dispatch(setIsAddDocumentOpen(true))}>Thêm tài liệu</Button>
      </PageHeader>
      <FilterWrapper>
          <Filter title="Ngành học" dataOptions=""/>
          <Filter title="Môn học" dataOptions=""/>
      </FilterWrapper>
      <Table tableHeader={docHeader}/>
      <AddDocument isVisible={isAddDocumentOpen}/>
    </>
  )
}


export default DocumentList

const PageHeader = styled.div`
  display: flex;
  justify-content:space-between;
`

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`