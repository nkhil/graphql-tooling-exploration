import test from 'ava'
import type { TestFn, ExecutionContext, SerialFn } from 'ava';
import server from '../server'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated'
import type { Sdk } from './generated'

type ServiceContext = {
  graphql: Sdk,
}

async function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function createContext(): ServiceContext {
  const portToListenOn = 4000 // TODO: Replace this to use @ava/get-port
  const graphQlEndpoint = `http://localhost:${portToListenOn}/graphql`

  const client = new GraphQLClient(graphQlEndpoint)
  const sdk = getSdk(client)

  return {
    graphql: sdk,
  }
}

export function setup() {
  const { serial } = test as TestFn<ServiceContext>

  test.before('Start the server', async () => {
    await server.listen({ port: 4000 }, error => {
      if (error !== null) console.log('An error!')
      console.log('server listening on 4000!')
    })
    await sleep(1000)
  })

  test.before('Add context', async (t) => {
    const context = createContext()
    t.context = context
  })

  test.after.always('stop service', async () => {
    await server.close()
  })

  return { 
    serial,
    test: (test as unknown) as TestFn<ServiceContext>,
  }
}
