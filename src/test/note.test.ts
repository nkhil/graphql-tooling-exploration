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
  const { id, title, content } = response.notes[0]
  
  t.is(title, '01')
  t.is(content, '01')
  t.is(id.length, 20)
})
