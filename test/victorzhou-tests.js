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
		it('Should redirect to /projects/iOS', function(done) {
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
}

module.exports = test;