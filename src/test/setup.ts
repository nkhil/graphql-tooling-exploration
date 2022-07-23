import test from 'ava'
import type { TestFn } from 'ava'
// import getPort from '@ava/get-port'
import server from '../server'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated'
import type { Sdk } from './generated'

type Setup = {
  context: {
    graphql: Sdk,
  },
  startServer: () => Promise<void>,
}

async function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export function setupAva(): {
  serial: TestFn['serial'],
  test: TestFn
} {
  const { serial } = test

  serial.before('Wait until graphql server initialises', async () => {
    await sleep(1000)
  })

  return { serial, test }
}

export async function setup(): Promise<Setup> {
  const portToListenOn = 4000
  const graphQlEndpoint = `http://localhost:${portToListenOn}/graphql`

  const client = new GraphQLClient(graphQlEndpoint)
  const sdk = getSdk(client)

  return {
    context: {
      graphql: sdk,
    },
    startServer: async () => {
      server.listen({ port: portToListenOn }, error => {
        if (error !== null) console.log('An error!')
        console.log('server listening on 4000!')
      })
      await sleep(1000)
    }
  }
}
