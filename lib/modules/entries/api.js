const _     = require('lodash');
const fs    = require('fs');
const path  = require('path');
const Boom  = require('boom');

module.exports.create = (req, reply) => {
  const mongoose = req.server.plugins.entries.mongoose;
  const Entry = req.server.plugins.entries.models.Entry;

  const data = _.assign({
    name: req.auth.credentials.name,
    email: req.auth.credentials.email,
  }, req.payload);
  const entry = new Entry(data);

  entry.save()
    .then((result) => {
      reply(result);
    })
    .catch((error) => {
      reply(Boom.badImplementation(error));
    });
}

module.exports.get = (req, reply) => {
  reply(Boom.notFound());
}
