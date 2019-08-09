'use strict'

const Hapi = require('@hapi/hapi')
const path = require('path')
const routes = require('./routes')
const config = require(path.join(process.cwd(), 'config'))

const server = Hapi.server({
  port: config.port || process.env.PORT || 5000,
  routes: {
    cors: {
      origin: ['*']
    }
  }
})

module.exports = {
  async start () {
    await server.route(routes)
    server.start()

    console.log(`Server start in port ${server.info.port}`)
    return server
  }
}
