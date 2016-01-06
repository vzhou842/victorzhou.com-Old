/**
 * Every Encircle2 API request must include a 'x-encircle2-access-token' header
 * with a token.
 * Requests with invalid tokens will be rejected.
 */
module.exports = function(req, res, next) {
	var accessToken = req.headers['x-encircle2-access-token'];
	if (!accessToken) {
		res.status(401).json({'error_message' : 'Missing Access Token'});
		return;
	}
	if (accessToken != process.env.ENCIRCLE2_AUTH_SECRET) {
		res.status(401).json({'error_message' : 'Invalid Access Token'});
		return;
	} 
	next();
};