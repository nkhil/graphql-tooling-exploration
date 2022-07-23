import { gql } from 'graphql-request'
import { setupAva } from './setup'

const { serial } = setupAva()

gql`
  query getUser($userId: ID!) {
  user(id: $userId) {
    firstName
    lastName
  }
}
`

serial('First test', async (t) => {
  const response = await t.context.graphql.getUser({ userId: '10' })
  
  t.is(response.user?.firstName, 'Andreanne')
  t.is(response.user?.lastName, 'Upton')
})
