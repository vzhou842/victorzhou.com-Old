function test(request) {
	function expectHTML(url) {
		return function(done) {
			request.get(url)
				.expect('Content-Type', /html/)
				.expect(200, done);
		};
	}

	const validPaths = [
		'/',
		'/presskits',
		'/contact',
		'/privacy/encircle2',
		'/projects/iOS',
		'/projects/web',
		'/projects/Android',
	];
	validPaths.forEach(path => {
		describe('GET ' + path, () => {
			it('Should be an HTML page', expectHTML(path));
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
		it('Should be a 404 HTML page', function(done) {
			request
				.get('/fake')
				.expect(404, done)
				.expect('Content-Type', /html/);
		});
	});
}

module.exports = test;