const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

module.exports = {
  key: 'update_business',

  noun: 'Update an Existing Business',
  display: {
    label: 'Update an Existing Business',
    description: 'Update an Existing Business Based on the given trigger.'
  },

  operation: {
    inputFields: [
      { key: 'title', required: true, type: 'text', helpText: 'Title in Hebrew.' }
    ],
    perform: (z, bundle) => {
      const promise = z.request({
        url: 'https://www.greeninvoice.co.il/api/v1/businesses',
        method: 'PUT',
        
        body: JSON.stringify({
          "title": bundle.inputData.title
        }),
        headers:
          {
            'Content-Type': 'application/json'
          }
      });

      return promise.then((response) => JSON.parse(response.content));
    },

    sample: {
      id: "abc12345"
    },

    outputFields: [
      { key: 'id', type: 'text', label: 'ID of the business updated' }
    ]
  }
};