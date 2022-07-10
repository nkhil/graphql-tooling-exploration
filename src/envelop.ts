import { envelop, useSchema } from '@envelop/core'
import { schema } from './schema'

export function getEnveloped() {
  return envelop({
    plugins: [
      useSchema(schema)
    ]
  })()
}