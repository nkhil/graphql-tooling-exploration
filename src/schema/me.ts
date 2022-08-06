import { builder } from '../builder';

type Me = {
  passportNumber: string,
  niNumber: string,
}

const meRef = builder.objectRef<Me>('Me')

builder.objectType(meRef, {
  fields: t => ({
    passportNumber: t.field({
      type: 'String',
      resolve: (parent) => parent.passportNumber,
    }),
    niNumber: t.field({
      type: 'String',
      resolve: (parent) => parent.niNumber,
    }),
    firstName: t.field({
      type: 'String',
      resolve: async () => Promise.resolve('Nikhil')
    })
  })
})

builder.queryFields(t => ({
  me: t.field({
    type: meRef,
    resolve: async (parent, args, context) => {
      return {
        passportNumber: 'new-passport-number',
        niNumber: 'ni number',
      }
    }
  })
}))
