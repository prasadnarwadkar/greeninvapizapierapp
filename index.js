const _ = require('lodash');
const authentication = require('./authentication');

const zapier = require('zapier-platform-core');

// creates
const update_business = require('./creates/update_business');

const includeSessionKeyHeader = (request, z, bundle) => {
  if (bundle.authData)
  {
    z.console.log("session key is: " + bundle.authData.sessionKey);
  }

  if (bundle.authData.sessionKey) {
    request.headers = request.headers || {};
    request.headers['Authorization'] = 'Bearer ' + bundle.authData.sessionKey;
  }
  return request;
};

const sessionRefreshIf401 = (response, z, bundle) => {
  if (response.status === 401) {
    throw new z.errors.RefreshAuthError('Session key needs refreshing.');
}
return response;
};

// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [includeSessionKeyHeader],
  afterResponse: [sessionRefreshIf401],

  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {

  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [update_business.key]: update_business
  }
};

const appTester = zapier.createAppTester(App);

// Finally, export the app.
module.exports = App;
