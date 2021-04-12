import * as queryString from 'query-string'
import { loadState } from './localStorage'

const getFetchUrl = (args) =>
  args.endpoint + (args.query ? `?${queryString.stringify(args.query)}` : '')

const getFetchArgs = (args) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = loadState('token')

  if (token && !args.skipAuthorization) {
    headers.Authorization = `Bearer ${token}`
  }

  const checkRequest = (request, requestType) => {
    if (request) {
      if (requestType === 'GET') {
        throw new Error('GET request does not support request body.')
      }
      return JSON.stringify(request)
    }
    return {}
  }

  const checkedBody = checkRequest(args.request, args.type)

  return {
    headers,
    method: args.type,
    signal: args.ct,
    body: checkedBody,
  }
}

const throwIfResponseFailed = async (response) => {
  if (!response.ok) {
    let parsedException = 'Something went wrong with request!'
    try {
      parsedException = await response.json()
    } catch (err) {
      // Do nothing
    }
    throw parsedException
  }
}

export default async function Api(args) {
  const fetchArgs = getFetchArgs(args)
  const fetchUrl = getFetchUrl(args)

  const response = await fetch(fetchUrl, fetchArgs)

  await throwIfResponseFailed(response)
  return response
}
