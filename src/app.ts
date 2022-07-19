import server from './server'

server.listen({
  port: 4000,
}, (error) => {
  if (error !== null) {
    // Handle errors in here
    console.log('an error occured!')
    console.log(error)
  }
})

console.log('App listening on port 4000')