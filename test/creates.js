require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('creates or updates', () => {

  describe('update entities', () => {

    it('has auth details added to every request', (done) => {
      // Use your own API public and private keys here.
      const bundle = {
        authData: {
          username: 'username',
          password: 'password'
        }
      };
  
      appTester(App.authentication.test, bundle)
        .then((response) => {
          response.status.should.eql(200);
          
          done();
        })
        .catch(done);
    });

    it('should update a new business', (done) => {
      const bundle = {
        inputData:
          {
            
            "title": "From Zapier App"
          }

      };

      appTester(App.creates.update_business.operation.perform, bundle)
        .then((result) => {
          console.log("Result: " + result);
          if (result) {
            console.log("Business updated with id: " + result.id);
            result.should.have.property('id');
          }
          else{
            var one = 1;
            one.should.eql(10);
          }
          done();
        })
        .catch(done);
    });

    it('should update a new business', (done) => {
      const bundle = {
        inputData:
          {
            
            "title": "From Zapier App again"
          }

      };

      appTester(App.creates.update_business.operation.perform, bundle)
        .then((result) => {
          console.log("Result: " + result);
          if (result) {
            console.log("Business updated with id: " + result.id);
            result.should.have.property('id');
          }
          else{
            var one = 1;
            one.should.eql(10);
          }
          done();
        })
        .catch(done);
    });
  });
});