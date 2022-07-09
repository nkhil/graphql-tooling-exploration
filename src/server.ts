import express from 'express'
import { requestHandler } from './request-handler'

const app = express()

app.use('/graphql', (req, res) => requestHandler(req, res))

const PORT = 4000

app.listen(PORT).on('error', () => {
  console.log('an error occured!')
})

console.log(`App listening on port ${PORT}`)
