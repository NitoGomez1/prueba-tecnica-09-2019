'use strict'

const Hapi = require('@hapi/hapi')
const path = require('path')
const config = require(path.join(process.cwd(), 'config'))
const Inert = require('@hapi/inert')

const server = Hapi.server({
  port: config.port || process.env.PORT || 5000,
  routes: {
    cors: {
      origin: ['*']
    }
  }
})

async function start () {
  await server.register(Inert)
  await server.route([{
    path: '/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  }])
  server.start()

  console.log(`Server start in port ${server.info.port}`)
  return server
}

start()
