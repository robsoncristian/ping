const { create } = require('rung-sdk');
const { String: Text } = require('rung-sdk/dist/types');
const Bluebird = require('bluebird');
const agent = require('superagent');
const promisifyAgent = require('superagent-promise');

const request = promisifyAgent(agent, Bluebird);

function main(context, done) {
    const { server } = context.params;
    
    return request.get(server)
        .then(function() {return {} },
              function() {return [`O ${server} está offline`]})
        .then(done)
        .catch(() => done({}));
}

const params = {
    server: {
        description: 'Servidor',
        type: Text
    }
};

const app = create(main, { params });

module.exports = app;