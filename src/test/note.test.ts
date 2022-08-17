import { gql } from 'graphql-request'
import { setup } from './setup'

const { serial } = setup()

gql`
  query getAllNotes {
    notes {
      id
      title
      content
    }
}
`

serial('Notes test', async (t) => {
  const response = await t.context.graphql.getAllNotes()
  t.is(response.notes.length, 1)
  t.deepEqual(response.notes[0], { id: '01', title: '01', content: '01' })
})
