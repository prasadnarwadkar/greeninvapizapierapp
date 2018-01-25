const testAuth = (z /*, bundle*/) => {
    // Ping Green Invoice Web API. 

    const promise = z.request({
        method: 'GET',
        url: 'https://www.greeninvoice.co.il/api/v1/users/me'
    });

    return promise.then(response => {
        if (response.status === 401) {
            throw new Error('The request Authorization header supplied is invalid');
        }
    });
};

// Get a token here.
const getSessionKey = (z, bundle) => {
    const promise = z.request({
        method: 'POST',
        url: 'https://www.greeninvoice.co.il/api/v1/account/token',
        body: {
            id: bundle.authData.username,
            secret: bundle.authData.password
        },
        headers:
            {
                'Content-Type': 'application/json'
            }
    });

    return promise.then(response => {
        console.log("response status "+ response.status);
        console.log("response content: "+ response.content);
        console.log("x-authorization-bearer: " + response.getHeader("x-authorization-bearer"));

        if (response.status === 401) {
            throw new Error('The username/password you supplied is invalid');
        }
        return {
            sessionKey: response.getHeader("x-authorization-bearer")
        };
    });
};

module.exports = {
    type: 'session',
    connectionLabel: '{{username}}',

    // Define any auth fields your app requires here. The user will be prompted to enter this info when
    // they connect their account.
    fields: [
        { key: 'username', label: 'Username', required: true, type: 'string', helpText: 'API Public Key' },
        { key: 'password', label: 'Password', required: true, type: 'string', helpText: 'API Private Key' }
    ],
    // The test method allows Zapier to verify that the credentials a user provides are valid. We'll execute this
    // method whenver a user connects their account for the first time.
    test: testAuth,
    // The method that will exchange the fields provided by the user for session credentials.
    sessionConfig: {
        perform: getSessionKey
    }
};
