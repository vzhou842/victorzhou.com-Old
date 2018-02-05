function test(request) {
	function expectHTML(url) {
		return done => {
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

	function expectRedirect(url) {
		return done => {
			request.get(url)
				.expect('Content-Type', /plain/)
				.expect(302, done);
		};
	}

	const redirectPaths = [
		'/projects',
		'/iOS',
		'/Android',
		'/web',
	];
	redirectPaths.forEach(path => {
		describe('GET ' + path, () => {
			it('Should redirect', expectRedirect(path));
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