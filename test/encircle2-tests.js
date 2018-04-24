var base_authorized = {
	'x-encircle2-access-token' : process.env.ENCIRCLE2_AUTH_SECRET,
	'Accept' : 'application/json',
}
var base_unauthorized = {
	'Accept' : 'application/json',
}

function isArrayOfMaps(res) {
		if (!res.body.maps) throw new Error("'maps' not included in response.");
		if (!(res.body.maps instanceof Array)) throw new Error("'maps' is not an Array.");
		if (res.body.maps.length == 0) throw new Error("'maps' has length 0.");
		if (!res.body.maps[0]._id) throw new Error("'_id' not included in map.");
		if (!res.body.maps[0].map) throw new Error("'map' not included in map.");
		if (!res.body.maps[0].title) throw new Error("'title' not included in map.");
		if (!res.body.maps[0].creator) throw new Error("'creator' not included in map.");
	}

function test(request) {
	describe('GET /encircle2/minSupportedVersion', function() {
		var API_URL = '/encircle2/minSupportedVersion';
		it('Should fail without proper authorization', function(done) {
			request
				.get(API_URL)
				.set(base_unauthorized)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
		it('Should return with proper authorization', function(done) {
			request
				.get(API_URL)
				.set(base_authorized)
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
	});

	describe('GET /encircle2/hotMaps', function() {
		var API_URL = '/encircle2/hotMaps';
		it('Should fail without proper authorization', function(done) {
			request
				.get(API_URL)
				.set(base_unauthorized)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
		it('Should return an array of maps', function(done) {
			request
				.get(API_URL)
				.set(base_authorized)
				.expect(isArrayOfMaps)
				.expect(200, done);
		});
	});

	describe('GET /encircle2/newMaps', function() {
		var API_URL = '/encircle2/newMaps';
		it('Should fail without proper authorization', function(done) {
			request
				.get(API_URL)
				.set(base_unauthorized)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
		it('Should return an array of maps', function(done) {
			request
				.get(API_URL)
				.set(base_authorized)
				.expect(isArrayOfMaps)
				.expect(200, done);
		});
	});

	describe('GET /encircle2/maps', function() {
		var API_URL = '/encircle2/maps';
		it('Should fail without proper authorization', function(done) {
			request
				.get(API_URL)
				.set(base_unauthorized)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
	});

	describe('POST /encircle2/createMap', function() {
		var API_URL = '/encircle2/createMap';
		it('Should fail without proper authorization', function(done) {
			request
				.post(API_URL)
				.set(base_unauthorized)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
		it('Should return 400 with missing params', function(done) {
			request
				.post(API_URL)
				.set(base_authorized)
				.expect('Content-Type', /json/)
				.expect(400, done);
		});
	});

	describe('POST /encircle2/incrementPlayCount', function() {
		var API_URL = '/encircle2/incrementPlayCount';
		it('Should fail without proper authorization', function(done) {
			request
				.post(API_URL)
				.set(base_unauthorized)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
		it('Should return 400 with missing params', function(done) {
			request
				.post(API_URL)
				.set(base_authorized)
				.expect('Content-Type', /json/)
				.expect(400, done);
		});
	});

	describe('POST /encircle2/addRating', function() {
		var API_URL = '/encircle2/addRating';
		it('Should fail without proper authorization', function(done) {
			request
				.post(API_URL)
				.set(base_unauthorized)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
		it('Should return 400 with missing params', function(done) {
			request
				.post(API_URL)
				.set(base_authorized)
				.expect('Content-Type', /json/)
				.expect(400, done);
		});
	});

	describe('POST /encircle2/addCompletion', function() {
		var API_URL = '/encircle2/addCompletion';
		it('Should fail without proper authorization', function(done) {
			request
				.post(API_URL)
				.set(base_unauthorized)
				.expect('Content-Type', /json/)
				.expect(401, done);
		});
		it('Should return 400 with missing params', function(done) {
			request
				.post(API_URL)
				.set(base_authorized)
				.expect('Content-Type', /json/)
				.expect(400, done);
		});
	});

	describe('/encircle2/fake', function() {
		var API_URL = '/encircle2/fake';
		it('GET Should 404 when authorized', function(done) {
			request
				.get(API_URL)
				.set(base_authorized)
				.expect(404, done);
		});
		it('POST Should 404 when authorized', function(done) {
			request
				.post(API_URL)
				.set(base_authorized)
				.expect(404, done);
		});
	});
}

module.exports = test;