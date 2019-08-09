'use strict'

const Server = require('./server')

Server.start()

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
