import API from '../../core/api'

export const getBoardData = (boardId) => API.get(`/board/${boardId}`)

export const changeColumnOrder = (newColumnOrder) =>
  API.patch('board/columns', newColumnOrder)

export const changeTicketPosition = (newTicketPosition) =>
  API.patch('board/ticket', newTicketPosition)
