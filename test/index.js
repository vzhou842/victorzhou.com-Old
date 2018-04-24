const app = require('../server');

var request = require('supertest')(app);

describe('Encircle2 Tests', function() {
	require('./encircle2-tests.js')(request);
});
describe('victorzhou.com Tests', function() {
	require('./victorzhou-tests.js')(request);
});