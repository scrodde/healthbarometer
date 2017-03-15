const mongoose = require('mongoose');

exports.register = (server, options, next) => {
  server.dependency(['bootstrap', 'forms'], setup);
  next();
}

const setup = (server, next) => {
  const settings = server.plugins.bootstrap.settings;
  const secrets = server.plugins.bootstrap.secrets;

  mongoose.Promise = require('bluebird');
  mongoose.connect(secrets.mongoose.url);
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

  const entrySchema = new mongoose.Schema({
    email: String,
    name: String,
    createdAt: { type: Date, default: Date.now }
  }, { strict: false });
  const Entry = mongoose.model('Entry', entrySchema);

  server.route([{
    method: 'POST',
    path: '/entries',
    handler: require('./api').create,
  },{
    method: 'GET',
    path: '/entries/{id}',
    handler: require('./api').get,
  }]);

  server.expose('models', { Entry });
  server.expose('mongoose', mongoose);

  next();
}

exports.register.attributes = {
  name: 'entries',
  version: '1.0.0'
};
