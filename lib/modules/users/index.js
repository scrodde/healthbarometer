const Boom = require('boom');

exports.register = (server, options, next) => {
  server.dependency(['bootstrap', 'hapi-auth-jwt2'], setup);
  next();
}

const setup = (server, next) => {
  const settings = server.plugins.bootstrap.settings;
  const secrets = server.plugins.bootstrap.secrets;

  server.route([{
    method: 'GET',
    path: '/users/me',
    handler: (req, reply) => {
      reply(req.auth.credentials);
    }
  }]);

  next();
}

exports.register.attributes = {
  name: 'users',
  version: '1.0.0'
};
