import { gql } from 'graphql-request'
import { setup, setupAva } from './setup'

const { serial } = setupAva()

gql`
  query getUser($userId: ID!) {
  user(id: $userId) {
    firstName
    lastName
  }
}
`


serial('Whateever', async (t) => {
  const { context: { graphql }, startServer } = await setup()
  await startServer()

  const response = await graphql.getUser({ userId: '10' })
  
  t.is(response.user?.__typename, 'User')
  t.is(response.user?.firstName, 'George')
  t.is(response.user?.lastName, 'Finn')
})

