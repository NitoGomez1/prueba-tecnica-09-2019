'use strict'

const Boom = require('@hapi/boom')
const { MongoClient } = require('mongodb')
const path = require('path')

const config = require(path.join(process.cwd(), 'config'))

let instance = false

class Db {
  constructor ({ collection, dbName = null, host = null }) {
    const client = Db.connect({
      host,
      dbName
    })

    this.collection = collection
    this.dbName = dbName
    this.client = client
  }

  static getUrl ({ host = null, dbName = null, url = null }) {
    try {
      url = url || config.mongoUrl || process.env.MONGO_URL

      if (!url) {
        dbName = dbName || config.dbName
        host = host || config.host
        url = `mongodb://${host}/${dbName}`
      }

      return url
    } catch (e) {
      throw new Boom(e)
    }
  }

  async getInstance (data = {}) {
    try {
      let client = null

      if (!instance) {
        client = await this.client
        const db = await client.db()
        instance = db
      }

      return Promise.resolve(instance)
    } catch (e) {
      return Promise.reject(new Boom(e))
    }
  }

  static init (data = {}) {
    try {
      return new Db(data)
    } catch (error) {
      return Promise.reject(new Boom(error))
    }
  }

  static async connect (data = {}) {
    try {
      const url = Db.getUrl(data)
      const i = await MongoClient.connect(url, { useNewUrlParser: true })

      return Promise.resolve(i)
    } catch (error) {
      return Promise.reject(new Boom(error))
    }
  }

  async getAll (query = {}, options = {}) {
    try {
      const db = await this.getInstance()
      const res = await db.collection(this.collection).find(query, options).toArray()
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(new Boom(error))
    }
  }

  async add (data) {
    try {
      if (!data || typeof data !== 'object') throw Boom.notFound('data not found or invalid')

      const db = await this.getInstance()

      await db.collection(this.collection).insertOne(data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(new Boom(error))
    }
  }

  async get (id) {
    try {
      if (!id) throw Boom.notFound('id not found or invalid')

      const db = await this.getInstance()

      const res = await db.collection(this.collection).find({ id: id }).toArray()

      if (res.length <= 0) throw Boom.notFound('id not found')

      return Promise.resolve(res[0])
    } catch (error) {
      return Promise.reject(new Boom(error))
    }
  }

  async delete (id) {
    try {
      const db = await this.getInstance()
      const item = await this.get(id)

      await db.collection(this.collection).deleteOne({
        id: id
      })

      return Promise.resolve(item)
    } catch (error) {
      return Promise.reject(new Boom(error))
    }
  }
}

module.exports = Db
