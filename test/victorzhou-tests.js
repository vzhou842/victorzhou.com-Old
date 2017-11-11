function test(request) {
	describe('GET /', function() {
		it('Should be an HTML page', function(done) {
			request
				.get('/')
				.expect('Content-Type', /html/)
				.expect(200, done);
		});
	});
	describe('GET /resume', function() {
		it('Should be an HTML page', function(done) {
			request
				.get('/resume')
				.expect('Content-Type', /html/)
				.expect(200, done);
		});
	});
	describe('GET /projects', function() {
		it('Should redirect', function(done) {
			request
				.get('/projects')
				.expect('Content-Type', /plain/)
				.expect(302, done);
		});
	});
	describe('GET /presskits', function() {
		it('Should be an HTML page', function(done) {
			request
				.get('/presskits')
				.expect('Content-Type', /html/)
				.expect(200, done);
		});
	});
	describe('GET /contact', function() {
		it('Should be an HTML page', function(done) {
			request
				.get('/contact')
				.expect('Content-Type', /html/)
				.expect(200, done);
		});
	});
	describe('GET /privacy/encircle2', function() {
		it('Should be an HTML page', function(done) {
			request
				.get('/privacy/encircle2')
				.expect('Content-Type', /html/)
				.expect(200, done);
		});
	});
	describe('GET /iOS', function() {
		it('Should redirect', function(done) {
			request
				.get('/iOS')
				.expect('Content-Type', /plain/)
				.expect(302, done);
		});
	});
	describe('GET /Android', function() {
		it('Should redirect', function(done) {
			request
				.get('/Android')
				.expect('Content-Type', /plain/)
				.expect(302, done);
		});
	});
	describe('GET /web', function() {
		it('Should redirect', function(done) {
			request
				.get('/web')
				.expect('Content-Type', /plain/)
				.expect(302, done);
		});
	});
	describe('GET /fake', function() {
		it('Should 404', function(done) {
			request
				.get('/fake')
				.expect(404, done);
		});
	});
}

module.exports = test;