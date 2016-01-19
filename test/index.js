var port = process.env.PORT || '3000';
var url = 'localhost:' + port;
var request = require('supertest')(url);

describe('Encircle2 Tests', function() {
	require('./encircle2-tests.js')(request);
});
describe('victorzhou.com Tests', function() {
	require('./victorzhou-tests.js')(request);
});