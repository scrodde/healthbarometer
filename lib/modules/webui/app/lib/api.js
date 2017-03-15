import axios from 'axios';
import _ from 'lodash';

function Client(options = {}) {
  this.callbacks = {
    unauthorized: [],
  };
  this.setOptions(options);
}

Client.prototype.setOptions = function(options = {}) {
  this.options = _.assign({
    timeout: 10000,
  }, options, {
    validateStatus: (status) => {
      if (_.indexOf([401, 403], status) > -1) {
        _.each(this.callbacks.unauthorized, (cb) => {
          if (_.isFunction(cb)) { cb(); }
        });
      }
      return status >= 200 && status < 300;
    }
  });
  this.instance = axios.create(this.options);
}

Client.prototype.on = function(eventType, cb) {
  if (_.has(this.callbacks, eventType)) {
      this.callbacks[eventType].push(cb);
  }
}

Client.prototype.setToken = function(token) {
  if (token) {
    this.instance.defaults.headers.common.Authorization = `${token}`;
  } else {
    delete this.instance.defaults.headers.common.Authorization;
  }
}

Client.prototype.formsGet = function(id) {
  return this.instance.get('/forms/'+id);
}

Client.prototype.usersMe = function() {
  return this.instance.get('/users/me');
}

Client.prototype.entriesCreate = function(entry) {
  return this.instance.post('/entries', { entry });
}

export let api = new Client();
