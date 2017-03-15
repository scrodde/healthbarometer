const _     = require('lodash');
const fs    = require('fs');
const yaml  = require('js-yaml');
const path  = require('path');
const Boom  = require('boom');

const dir = path.join(__dirname, '../../../config/forms');

module.exports.all = (req, reply) => {
  let forms = [];
  const files = fs.readdirSync(dir);
  _.each(files, (fileName) => {
    const id = _.indexOf(files, fileName);
    const structure = yaml.load(fs.readFileSync(path.join(dir, fileName)))
    forms.push({
      id,
      name: fileName.split('.')[0],
      structure,
    });
  });
  reply(forms);
}

module.exports.get = (req, reply) => {
  const files = fs.readdirSync(dir);
  const fileName = _.get(files, `[${req.params.id}]`);
  if (fileName) {
    const structure = yaml.load(fs.readFileSync(path.join(dir, fileName)));
    reply({
      id: req.params.id,
      name: fileName.split('.')[0],
      structure,
    });
  } else {
    reply(Boom.notFound());
  }
}
