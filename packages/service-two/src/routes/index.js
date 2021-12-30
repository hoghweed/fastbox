'use strict'

module.exports = async function (fastify, options) {
    fastify.get('/', function (request, reply) {
        reply.send({ root: true, name: 'two' });
    });
}