const fs    = require("fs");
const kue   = require('kue');
const path  = require('path');
const _     = require('lodash');
const Case  = require('case');
const Joi   = require('joi');

exports.register = (server, options, next) => {
  server.dependency(['bootstrap'], setup);
  next()
}

const setup = (server, next) => {
  server.register(require('vision'), (err) => {
    if (err) { throw err; }
    server.register(require('inert'), (err) => {
      if (err) { throw err; }

      const urls = server.plugins.bootstrap.settings.urls;

      server.views({
        engines: {
          html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
      });

      server.route([{
        method: 'GET',
        path: '/assets/{param*}',
        config: { auth: false },
        handler: {
          directory: {
            path: path.join(__dirname, 'public/assets/')
          }
        }
      },{
        method: 'GET',
        path: '/{param*}',
        config: { auth: false },
        handler: (request, reply) => {
          const assetsManifest = require('./public/assets/assets-manifest.json');

          reply.view('index', {
            assets: {
              js:  '/assets' + assetsManifest.main.js,
              css: '/assets' + assetsManifest.main.css,
            },
            config: {
              baseUrl: urls.baseUrl,
              apiBaseUrl: urls.apiBaseUrl,
              authUrl: urls.authUrl,
            }
          });
        }
      }]);

      next();
    });
  });
}

exports.register.attributes = {
  name: 'webui',
  version: '1.0.0',
};
