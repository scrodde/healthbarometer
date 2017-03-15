const fs    = require('fs');
const path  = require('path');
const yaml  = require('js-yaml');
const Case  = require('case');
const _     = require('lodash');

exports.register = (plugin, options, next) => {

  const env     = process.env.NODE_ENV || 'development';

  const secretsPath = path.join(__dirname, '../../../config/secrets.yml');
  let secrets = {};
  if (fs.existsSync(secretsPath)) {
    secrets = yaml.load(
      fs.readFileSync(secretsPath, 'utf8')
    )[env];
  } else {
    // TODO: LOL
    secrets = _.assign(secrets, {
      secretKeyBase: process.env.SECRET_KEY_BASE,
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      mongoose: {
        url: process.env.MONGOOSE_URL,
      },
    });
  }

  const settings = yaml.load(
    fs.readFileSync(path.join(__dirname, '../../../config/settings.yml'), 'utf8')
  )[env];
  settings.env = env;

  console.log(settings);
  console.log(secrets);

  plugin.expose('secrets', secrets);
  plugin.expose('settings', settings);

  next();
}

exports.register.attributes = {
  name: 'bootstrap',
  version: '1.0.0',
};
