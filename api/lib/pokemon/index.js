'use strict'

const request = require('request-promise')
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'
const Boom = require('@hapi/boom')

class Pokemon {
  constructor (id) {
    this.id = id
  }

  async get () {
    try {
      const pokemon = await request({
        url: `${apiUrl}${this.id}`,
        method: 'GET',
        json: true
      })

      pokemon.image = `https://pokeres.bastionbot.org/images/pokemon/${this.id}.png`

      return Promise.resolve(pokemon)
    } catch (error) {
      return Promise.reject(new Boom(error))
    }
  }
}

module.exports = Pokemon
