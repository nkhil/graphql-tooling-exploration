import { database } from '../../adapters/database'

export const databaseContext = {
  database: {
    ...database,
  }
}

export type DatabaseContext = typeof databaseContext
