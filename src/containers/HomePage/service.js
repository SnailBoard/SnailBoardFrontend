import API from '../../core/api'

export const addTeamRequest = (payload) =>
  API.post('/team', payload)
    .then((response) => response)
    .catch((reason) => reason)

export const getTeamsRequest = () =>
  API.get('/team')
    .then((response) => response)
    .catch((reason) => reason)
