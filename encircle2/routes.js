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


// Encircle2 Auth Middleware
router.all('/*', [require('./auth/validateRequest')]);

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
			res.status(200).json({ maps : maps });
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
			res.status(200).json({ maps : maps });
		} else {
			res.status(500).json({'error_message' : err.message});
		}
	});
});

/** GET /maps
 * Searches for maps based on the given parameters.
 * @param mapID OPTIONAL. If given, takes precedence over all other parameters and returns the map with this ID.
 * @param searchQuery OPTIONAL. A search string to match map titles with (ignoring case).
 * @param num OPTIONAL. The max number of maps to return. Must be >= 1.
 * @return map Used if mapID is provided as a parameter.
 * @return maps Used if mapID is not provided as a parameter.
 */
router.get('/maps', function(req, res, next) {
	var mapID = req.query.mapID;
	var searchQuery = req.query.searchQuery;
	var num = parseInt(req.query.num);
	if (num < 1) num = 1;

	if (!mapID && !searchQuery) {
 		res.status(400).json({'error_message' : "Missing parameters!"});
 		return;		
	} else if (mapID) {
		//search by ID
		EncircleMap.findOne({'_id' : mapID}).exec(function(err, map) {
			if (err) {
 				res.status(500).json({'error_message' : err.message});
			} else {
				res.status(200).json({'map' : map});
			}
		});
	} else {
		//search by title
		EncircleMap.find({'title' : new RegExp(searchQuery, 'i')}).limit(num).exec(function(err, maps) {
			if (err) {
 				res.status(500).json({'error_message' : err.message});
			} else {
				res.status(200).json({'maps' : maps});
			}
		});
	}
});

/** POST /createMap
 * Creates a custom map.
 * @param map The map string.
 * @param title The title of the map.
 * @param description The description of the map.
 * @param creator OPTIONAL. The creator of the map.
 * @param invisibility OPTIONAL
 * @param two_turtles OPTIONAL
 * @param vortex OPTIONAL
 */
 router.post('/createMap', function(req, res, next) {
 	var map = req.body.map;
 	var title = req.body.title;
 	var description = req.body.description;
 	var creator = req.body.creator;
 	if (!creator) creator = 'Unknown';

 	var invisibility = req.body.invisibility;
 	var two_turtles = req.body.two_turtles;
 	var vortex = req.body.vortex;
 	if (!invisibility) invisibility = false;
 	if (!two_turtles) two_turtles = false;
 	if (!vortex) vortex = false;

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
 		invisibility : invisibility,
 		two_turtles : two_turtles,
 		vortex : vortex,
 	});

 	newMap.save(function(err, savedMap) {
 		if (!err) {
 			res.status(200).json({'message' : 'Map successfully saved.'});
 		} else {
 			res.status(500).json({'error_message' : err.message});
 		}
 	});
 });

/** POST /incrementPlayCount
 * Increments the play count for a certain map.
 * @param id The mapID of the map.
 * @param amount OPTIONAL. The amount to increment by.
 */
router.post('/incrementPlayCount', function(req, res, next) {
	var id = req.body.id;
	var amount = parseInt(req.body.amount);
	if (!amount) amount = 1;

	if (!id) {
 		res.status(400).json({'error_message' : "'id' is a required param."});
 		return;
	}

	EncircleMap.findOne({'_id' : id}).exec(function(err, map) {
		map.plays = parseInt(map.plays) + amount;
		map.save(function(err, savedMap) {
			if (!err) {
	 			res.status(200).json({'message' : 'Map successfully saved.'});
	 		} else {
	 			res.status(500).json({'error_message' : err.message});
	 		}
		});
	});
})

module.exports = router;