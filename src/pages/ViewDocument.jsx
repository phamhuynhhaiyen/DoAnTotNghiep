import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled
 from 'styled-components'
import Loading from '../components/Loading'
import { getDocument } from '../redux/apiCalls'

const ViewDocument = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const doc = useSelector(state => state.document.doc)

  useEffect(() => {
    getDocument(id, dispatch).then(() => setIsLoading(false))
  }, [])

  return (
    isLoading ? <Loading />
      :
      <Wrapper>
        {
          doc.type === "pdf" ?
            <iframe src={doc.url} style={{ width: "100%", height: "100vh" }} frameborder="0"></iframe> :
            <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${doc.url}`} style={{ width: "100%", height: "100%" }} frameborder="0"></iframe>
        }
      </Wrapper>
  )
}

export default ViewDocument

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
`
