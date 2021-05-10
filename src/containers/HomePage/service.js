import API from '../../core/api'

export const addTeamRequest = (loginPayload) =>
  API.post('/team', loginPayload)
    .then((response) => response)
    .catch((reason) => reason)
