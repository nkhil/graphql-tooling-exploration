import { builder } from '../builder';

type Me = {
  passportNumber: string,
  niNumber: string,
  firstName: string,
}

const meRef = builder.objectRef<Me>('Me').implement({
  fields: t => ({
    passportNumber: t.exposeString('passportNumber'),
    niNumber: t.exposeString('niNumber'),
    firstName: t.exposeString('firstName'),
  })
})

builder.queryFields(t => ({
  me: t.field({
    type: meRef,
    resolve: async (parent, args, context) => {
      return {
        passportNumber: 'new-passport-number',
        niNumber: 'ni number',
        firstName: 'whatever',
      }
    }
  })
}))
