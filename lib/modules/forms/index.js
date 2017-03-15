exports.register = (server, options, next) => {
  server.dependency(['bootstrap', 'hapi-auth-jwt2'], setup);
  next();
}

const setup = (server, next) => {
  const settings = server.plugins.bootstrap.settings;
  const secrets = server.plugins.bootstrap.secrets;

  server.route([{
    method: 'GET',
    path: '/forms',
    handler: require('./api').all
  },{
    method: 'GET',
    path: '/forms/{id}',
    handler: require('./api').get
  }]);

  next();
}

exports.register.attributes = {
  name: 'forms',
  version: '1.0.0'
};
