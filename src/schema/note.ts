import { builder } from '../builder';

export type Note = {
  id: string;
  title: string;
  content: string;
}

const NoteRef = builder.objectRef<Note>('Note')

NoteRef.implement({
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content'),
  })
})

builder.queryFields(t => ({
  notes: t.field({
    type: [NoteRef],
    resolve: async (parent, args, context) => {
      return context.database.getAllNotes()
    }
  })
}))
