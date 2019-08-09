'use strict'

const $ = require('jquery')
const axios = require('axios')
const config = require('../config.json')

const apiUrl = config.apiUrl

let testApi = false
let testDb = false

const $testapi = $('#testapi')
const $testdb = $('#testdb')

function testApiRequest () {
  // Make a request for a user with a given ID
  return axios.get(apiUrl)
}

function testDbRequest () {
  // Make a request for a user with a given ID
  return axios.get(`${apiUrl}/pokemons`)
}

function init () {
  testApiRequest()
    .then(res => {
      $testapi.find('.icofont-error').hide()
      $testapi.find('.icofont-check').show()
      testApi = true
    })
    .catch(res => {
      $testapi.find('.icofont-error').show()
      $testapi.find('.icofont-check').hide()
      testApi = false
    })

  testDbRequest()
    .then(res => {
      $testdb.find('.icofont-error').hide()
      $testdb.find('.icofont-check').show()
      testDb = true
    })
    .catch(res => {
      $testdb.find('.icofont-error').show()
      $testdb.find('.icofont-check').hide()
      testDb = false
    })
}

init()
