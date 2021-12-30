'use strict'

const { join } = require('path')
const autoload = require('fastify-autoload')

module.exports = async function (fastify, opts) {

    fastify.register(autoload, {
        dir: join(__dirname, 'src', 'routes'),
        routeParams: true,
        ignorePattern: /.*test.js/,
        options: opts,
    })
}