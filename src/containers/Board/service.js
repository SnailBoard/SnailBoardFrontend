import API from '../../core/api'

export const getBoardDataRequest = (boardId) => API.get(`/board/${boardId}`)

export const changeColumnOrderRequest = (newColumnOrder) =>
  API.patch('board/columns', newColumnOrder)

export const changeTicketPositionRequest = (newTicketPosition) =>
  API.patch('board/ticket', newTicketPosition)

export const addColumnRequest = ({
  name,
  description,
  boardId,
  columnPosition,
}) => API.post('column/', { name, description, boardId, columnPosition })

export const addTicketRequest = ({
  name,
  description,
  // eslint-disable-next-line camelcase
  reporter_id,
  // eslint-disable-next-line camelcase
  assignee_id,
  position,
  // eslint-disable-next-line camelcase
  story_points,
  // eslint-disable-next-line camelcase
  column_id,
  // eslint-disable-next-line camelcase
  column_position,
}) =>
  API.post('ticket/', {
    name,
    description,
    reporter_id,
    assignee_id,
    position,
    story_points,
    column_id,
    column_position,
  })
    .then((response) => response)
    .catch((reason) => reason)
