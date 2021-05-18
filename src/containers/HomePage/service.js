import API from '../../core/api'

export const addTeamRequest = (payload) =>
  API.post('/team', payload)
    .then((response) => response)
    .catch((reason) => reason)

export const getTeamsRequest = () =>
  API.get('/team')
    .then((response) => response)
    .catch((reason) => reason)

export const getUsersRequest = () =>
  API.get('/usersInfo')
    .then((response) => response)
    .catch((reason) => reason)

export const inviteUserToTeamRequest = (payload) => {
  API.get('/team/generateLink', {
    params: payload,
  })
    .then((response) => response)
    .catch((reason) => reason)
}

export const addBoardRequest = (payload) =>
  API.post('/board', payload)
    .then((response) => response)
    .catch((reason) => reason)
