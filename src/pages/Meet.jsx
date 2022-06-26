import React, { useEffect, useState } from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const Meet = () => {
  const [call, setCall] = useState(false)
  const user = useSelector(state => state.auth.user)
  const { id } = useParams()

  useEffect(() => {
    if (id && user) setCall(true)

  }, [])

  return call ? (
    <JitsiMeeting
      roomName={id}
      getIFrameRef = { node => node.style.height = '100vh'}
      userInfo={{
        displayName: user.name,
        email: "pp@gmail.com"
      }}
    />
    ) : (
  <Loading />
)
}

export default Meet