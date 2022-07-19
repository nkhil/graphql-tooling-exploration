import { requestHandler } from './request-handler'
import fastify from 'fastify'
import { renderGraphiQL, shouldRenderGraphiQL } from 'graphql-helix'

const app = fastify()

app.route({
  method: ['POST'],
  url: '/graphql',
  handler: async (req, res) => requestHandler(req, res),
})

app.route({
  method: ['GET'],
  url: '/graphql',
  async handler(req, res) {
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    }

    if (shouldRenderGraphiQL(request)) {
      void res.type('text/html')
      void res.send(renderGraphiQL())
    }
  }
})

export default app
