var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var EncircleMap = require('./models/EncircleMap');

// CONNECT TO MONGOLAB MONGODB DATABASE
mongoose.connect(process.env.ENCIRCLE2_MONGODB_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db opened');
});

const DEFAULT_NUM_RETURN_MAPS = 50;

/** GET /hotMaps
 * Returns an array of the most popular maps.
 * @param num OPTIONAL. The number of maps to return (at most).
 */
router.get('/hotMaps', function(req, res, next) {
	var limit = DEFAULT_NUM_RETURN_MAPS;
	if (req.params.num) limit = parseInt(req.params.num);
	EncircleMap.find({}).sort({plays : 'descending'}).limit(limit).lean().exec(function(err, maps) {
		if (!err) {
			res.status(200).json(maps);
		} else {
			res.status(500).json({'error_message' : err.message});
		}
	});
});

/** GET /newMaps
 * Returns an array of the newest maps.
 * @param num OPTIONAL. The number of maps to return (at most).
 */
router.get('/newMaps', function(req, res, next) {
	var limit = DEFAULT_NUM_RETURN_MAPS;
	if (req.params.num) limit = parseInt(req.params.num);
	EncircleMap.find({}).sort({createdAt : 'descending'}).limit(limit).lean().exec(function(err, maps) {
		if (!err) {
			res.status(200).json(maps);
		} else {
			res.status(500).json({'error_message' : err.message});
		}
	});
});

/** POST /createMap
 * Creates a custom map.
 * @param map The map string.
 * @param title The title of the map.
 * @param description The description of the map.
 * @param creator OPTIONAL. The creator of the map.
 */
 router.post('/createMap', function(req, res, next) {
 	var map = req.body.map;
 	var title = req.body.title;
 	var description = req.body.description;
 	var creator = req.body.creator;
 	if (!creator) creator = 'Unknown';

 	if (!map) {
 		res.status(400).json({'error_message' : "'map' is a required param."});
 		return;
 	} else if (!title) {
 		res.status(400).json({'error_message' : "'title' is a required param."});
 		return;
 	} else if (!description) {
 		res.status(400).json({'error_message' : "'description' is a required param."});
 		return;
 	}

 	var newMap = new EncircleMap({
 		map : map,
 		title : title,
 		description : description,
 		creator : creator,
 		createdAt : Date.now(),
 	});

 	newMap.save(function(err, savedMap) {
 		if (!err) {
 			res.status(200).json({'message' : 'Map successfully saved.'});
 		} else {
 			res.status(500).json({'error_message' : err.message});
 		}
 	});
 });

module.exports = router;