exports.register = (server, options, next) => {
  server.dependency(['bootstrap', 'bell', 'hapi-auth-jwt2'], setup);
  next();
}

const setup = (server, next) => {
  const settings = server.plugins.bootstrap.settings;
  const secrets = server.plugins.bootstrap.secrets;

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: secrets.secretKeyBase,
    clientId: secrets.google.clientId,
    clientSecret: secrets.google.clientSecret,
    isSecure: false,
    providerParams: {
      prompt: 'consent select_account' ,
    },
  });

  server.auth.strategy('jwt', 'jwt',
  {
    key: secrets.secretKeyBase,
    validateFunc: require('./jwt').validate,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });

  server.auth.default('jwt');

  server.route([{
    method: 'GET',
    path: '/auth/google',
    config: { auth: 'google' },
    handler: require('./jwt').create,
  }]);

  next();
}

exports.register.attributes = {
  name: 'auth',
  version: '1.0.0'
};
