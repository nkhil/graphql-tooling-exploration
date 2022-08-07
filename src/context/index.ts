import { useExtendContext } from '@envelop/core'
import type { DatabaseContext } from './database'
import { databaseContext } from './database'

export const databaseContextPlugin = useExtendContext((): DatabaseContext => {
  return {
    ...databaseContext,
  }
})

export type Context = DatabaseContext
