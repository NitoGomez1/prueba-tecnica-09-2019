'use strict'

const Db = require('./lib/db')
const Pokemon = require('./lib/pokemon')

const db = Db.init({
  host: 'localhost:27017',
  dbName: 'pokemons',
  collection: 'pokemons'
})

const routes = [
  {
    path: '/',
    method: 'GET',
    handler (request, h) {
      return h.response({
        data: {
          ok: true
        },
        statusCode: 200
      }).code(200)
    }
  },
  {
    path: '/pokemons',
    method: 'GET',
    async handler (request, h) {
      let response = {}

      try {
        const pokemons = await db.getAll()

        response = {
          data: pokemons,
          statusCode: 200
        }
      } catch (error) {
        console.log(error)
        response = error
      }
      return h.response(response).code(response.statusCode)
    }
  },
  {
    path: '/pokemons/{pokemonId}',
    method: 'POST',
    async handler (request, h) {
      let response = {}
      const pokemonId = request.params.pokemonId

      try {
        const pokemon = new Pokemon(pokemonId)
        const pokemonData = await pokemon.get()

        await db.add(pokemonData)

        response = {
          data: pokemonData,
          statusCode: 200
        }
      } catch (error) {
        console.log(error)
        response = error
      }
      return h.response(response).code(response.statusCode)
    }
  }
]

module.exports = routes
