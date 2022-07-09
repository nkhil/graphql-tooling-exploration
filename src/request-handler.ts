import { graphqlHTTP } from 'express-graphql'
import { getEnveloped } from './envelop'
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { v4 as uuidv4 } from 'uuid'

type Request = {
  requestId: string,
  body: ExpressRequest['body'],
  headers: ExpressRequest['headers'],
  method: ExpressRequest['method'],
  query: ExpressRequest['query'],
}

export function requestHandler(
  req: ExpressRequest,
  res: ExpressResponse,
  ) {
  const requestId = uuidv4()

  const {
    schema,
    contextFactory,
    execute,
    parse,
    validate,
  } = getEnveloped()

  const request = {
    requestId,
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  }


  return graphqlHTTP({
    schema,
    graphiql: true,
  })
} 