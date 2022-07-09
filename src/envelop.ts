import type { GetEnvelopedFn } from '@envelop/core'
import { enableIf, envelop, useSchema } from '@envelop/core'
import { schema } from './schema'

export type BaseContext = {
  [x: string]: unknown
  [x: number]: unknown
  [x: symbol]: unknown
}

export function getEnveloped() {
  return envelop({
    plugins: [
      useSchema(schema)
    ]
  })()
}