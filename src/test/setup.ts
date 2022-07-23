import test from 'ava'
import type { TestFn, ExecutionContext, SerialFn } from 'ava';
import server from '../server'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated'
import type { Sdk } from './generated'
import { getPort } from './get-port'

type ServiceContext = {
  graphql: Sdk,
}

async function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function createContext(port: number): ServiceContext {
  const graphQlEndpoint = `http://localhost:${port}/graphql`

  const client = new GraphQLClient(graphQlEndpoint)
  const sdk = getSdk(client)

  return {
    graphql: sdk,
  }
}

export function setup() {
  const { serial } = test as TestFn<ServiceContext>

  
  test.before('Start the server', async (t) => {
    // Get an available port
    const availablePort = await getPort()
    // const availablePort = 4000

    // Create a context + a client
    const context = createContext(availablePort)

    // Set up a context
    t.context = context

    // Start the server at the available port
    server.listen({ port: availablePort }, error => {
      if (error !== null) throw error
    })

    // Wait for the server to be ready
    await sleep(1000)
  })

  test.after.always('stop service', async () => {
    await server.close()
  })

  return { 
    serial,
    test: (test as unknown) as TestFn<ServiceContext>,
  }
}
