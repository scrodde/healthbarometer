const Glue      = require('glue');
const manifest  = require('./config/manifest.json');
const _         = require('lodash');

const options = {
  relativeTo: __dirname + '/lib/modules'
};

if (process.env.NODE_ENV == 'production') {
  _.set(manifest, 'connections[0].port', process.env.PORT);
}

Glue.compose(manifest, options, (err, server) => {
  server.start((err, server) =>  {
    if (err) { throw err; }
  });
});
