const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports.create = (req, reply) => {
  const secrets   = req.server.plugins.bootstrap.secrets;
  const settings  = req.server.plugins.bootstrap.settings;

  const redirectTo = _.get(req, 'auth.credentials.query.redirectTo');
  if (!req.auth.isAuthenticated) {
    return reply.redirect(`${redirectTo}?error=Not%20Authenticated`);
  }

  const email = _.get(req.auth, 'credentials.profile.email');
  const validDomain = _.find(settings.allowedDomains, (domain) => {
    console.log(domain);
    if (email.match(new RegExp(`${domain}$`))) return true;
  });

  if (!validDomain) {
    return reply.redirect(`${redirectTo}?error=Email%20${email}%20is%20not%20allowed`);
  }

  var isAdmin = false;
  _.each(settings.admins, (adminEmail) => {
    if (email === adminEmail) {
      isAdmin = true;
    }
  });

  const user = {
    admin: isAdmin,
    name: _.get(req.auth, 'credentials.profile.displayName'),
    initials: _.map(_.get(req.auth, 'credentials.profile.displayName', '').split(' '), (word) => {
      return _.get(word, '[0]', '');
    }).join(''),
    email: _.get(req.auth, 'credentials.profile.email'),
    picture: _.get(req.auth, 'credentials.profile.raw.picture'),
  };

  const token = jwt.sign(user, secrets.secretKeyBase, { expiresIn: '8h' });

  reply.redirect(`${redirectTo}?token=${token}`)
};

module.exports.validate = (decoded, req, callback) => {
  const settings  = req.server.plugins.bootstrap.settings;

  const email = _.get(decoded, 'email');
  const validDomain = _.find(settings.allowedDomains, (domain) => {
    if (email.match(new RegExp(`${domain}$`))) return true;
  });
  if (!validDomain) {
    return callback(null, false);
  } else {
    return callback(null, true);
  }

};
