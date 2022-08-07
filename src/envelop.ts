import { envelop, useSchema } from '@envelop/core'
import { schema } from './schema'
import type { GetEnvelopedFn } from '@envelop/core'
import {
  databaseContextPlugin,
  Context,
} from './context'

export function getEnveloped(): ReturnType<GetEnvelopedFn<Context>> {
  return envelop({
    plugins: [

      // Context
      databaseContextPlugin,

      useSchema(schema)
    ]
  })()
}
