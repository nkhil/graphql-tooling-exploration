import { getEnveloped } from './envelop'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuidv4 } from 'uuid'
import { getGraphQLParameters, processRequest, sendResult } from 'graphql-helix'

type Request = {
  requestId: string,
  body: FastifyRequest['body'],
  headers: FastifyRequest['headers'],
  method: FastifyRequest['method'],
  query: FastifyRequest['query'],
}

export async function requestHandler(
  req: FastifyRequest,
  res: FastifyReply,
  ) {
  const requestId = uuidv4()

  const {
    schema,
    contextFactory,
    execute,
    parse,
    validate,
  } = getEnveloped()

  const request: Request = {
    requestId,
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  }

  // TODO: You can get the content-length out from headers in order to log metrics

  const { operationName, query, variables } = getGraphQLParameters(request)

  let result

  try {
    result = await processRequest({
      contextFactory,
      execute,
      parse,
      schema,
      validate,
      operationName,
      query,
      request,
      variables,
    })
  } catch (error) {
    result = error
  }

  sendResult(result, res.raw)
}
