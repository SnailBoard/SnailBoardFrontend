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
