import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router'

const TeamInvitePage = () => {
  const { inviteId } = useParams()

  useEffect(() => localStorage.setItem('inviteId', inviteId))
  return <Redirect to="/login" />
}

export default TeamInvitePage
