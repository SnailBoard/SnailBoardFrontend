import React, { useEffect } from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'

const TeamInvitePage = (props) => {
  useEffect(() => localStorage.setItem('inviteId', props.match.params.inviteId))
  return <Redirect to="/login" />
}

TeamInvitePage.propTypes = {
  match: PropTypes.object,
}

export default TeamInvitePage
