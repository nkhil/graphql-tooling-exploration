import fs from 'fs'
import { exit } from 'process'
import { printSchema } from 'graphql'
import { schema } from '../schema'

const pathFromRoot = 'src/schema.graphql'

fs.writeFileSync(pathFromRoot, printSchema(schema))

console.log('✅ Schema printed to:', pathFromRoot)

exit()
