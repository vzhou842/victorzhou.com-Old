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
 * @param mapIDs OPTIONAL. A comma separated list of map IDs. 
 * @param searchQuery OPTIONAL. A search string to match map titles and creators with (ignoring case).
 * @param num OPTIONAL. The max number of maps to return. Must be >= 1. Only used for searchQuery.
 * @return map Used if mapID is provided as a parameter.
 * @return maps Used if mapID is not provided as a parameter.
 */
router.get('/maps', function(req, res, next) {
	var mapID = req.query.mapID;
	var searchQuery = req.query.searchQuery;
	var mapIDs = (req.query.mapIDs) ? (req.query.mapIDs).split(',') : null;

	var num = parseInt(req.query.num);
	if (!num) num = 20;
	if (num < 1) num = 1;
	if (num > 50) num = 50;

	if (!mapID && !searchQuery && !mapIDs) {
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
	} else if (mapIDs) {
		//search multiple by IDs
		EncircleMap.find({'_id' : { $in : mapIDs }}).exec(function(err, maps) {
			if (err) {
 				res.status(500).json({'error_message' : err.message});
			} else {
				res.status(200).json({'maps' : maps});
			}
		});
	} else {
		//search by title
		EncircleMap.find({$or : [
			{'title' : new RegExp(searchQuery, 'i')},
			{'creator' : new RegExp(searchQuery, 'i')},
			]}).limit(num).exec(function(err, maps) {
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
 * @return The mapID of the created map.
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
 			res.status(200).json({'id' : savedMap._id});
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
		if (map) {
			map.plays = parseInt(map.plays) + amount;
			map.save(function(err, savedMap) {
				if (!err) {
		 			res.status(200).json({'message' : 'Map successfully saved.'});
		 		} else {
		 			res.status(500).json({'error_message' : err.message});
		 		}
			});
		} else {
			res.status(200).json({'message' : 'This map does not exist.'});
		}
	});
});

/** POST /addRating
 * Adds a rating for a certain map.
 * @param id The mapID of the map to be rated.
 * @param rating OPTIONAL. The rating. Must be between 1 and 5, inclusive.
 * @param ratings OPTIONAL. An array of comma separated ratings. Use this to post multiple ratings at once.
 */
router.post('/addRating', function(req, res, next) {
	var rating = parseInt(req.body.rating);
	var id = req.body.id;
	var ratings = (req.body.ratings) ? (req.body.ratings).split(',') : null;

	if (!id) {
 		res.status(400).json({'error_message' : "'id' is a required param."});
 		return;		
	} else if (!rating && !ratings) {
 		res.status(400).json({'error_message' : "You must include either 'rating' or 'ratings' as a parameter."});
 		return;
	} else if ((rating < 1 || rating > 5) && !ratings) {
 		res.status(400).json({'error_message' : rating + " is not a valid value for 'rating'."});
 		return;
	}

	EncircleMap.findOne({'_id' : id}).exec(function(err, map) {
		if (map) {
			if (!ratings) {
				//1 rating
				ratings = [rating];
			}
			ratings.forEach(function(r) {
				r = parseInt(r);
				if (!r) {
			 		return;					
				}
				if (map.num_ratings == 0) {
					map.rating = r;
					map.num_ratings = 1;
				} else {
					map.rating = ((map.rating * map.num_ratings) + r) / (map.num_ratings + 1);
					map.num_ratings++;
				}
			});
			map.save(function(err, savedMap) {
				if (!err) {
		 			res.status(200).json({'message' : 'Map successfully saved.'});
		 		} else {
		 			res.status(500).json({'error_message' : err.message});
		 		}
			});
		} else {
			res.status(200).json({'message' : 'This map does not exist.'});			
		}
	});
});

/** POST /addCompletion
 * Adds a completion (a user completed the map) for a certain map.
 * @param id The mapID of the map to add a completion for.
 * @param moves OPTIONAL. The number of moves it took.
 * @param moves_array OPTIONAL. An array of comma separated moves. Use this to post multiple completions at once.
 */
router.post('/addCompletion', function(req, res, next) {
	var moves = parseInt(req.body.moves);
	var movesArray = (req.body.moves_array) ? (req.body.moves_array).split(',') : null;
	var id = req.body.id;

	if (!id) {
 		res.status(400).json({'error_message' : "'id' is a required param."});
 		return;		
	} else if (!moves && !movesArray) {
 		res.status(400).json({'error_message' : "You must include either 'moves' or 'moves_array' as a parameter."});
 		return;
	} else if (moves < 1 && !movesArray) {
 		res.status(400).json({'error_message' : moves + " is not a valid value for 'moves'."});
 		return;
	}

	EncircleMap.findOne({'_id' : id}).exec(function(err, map) {
		if (map) {
			if (!movesArray) {
				movesArray = [moves];
			}
			movesArray.forEach(function(m) {
				m = parseInt(m);
				if (!m) {
			 		return;					
				}
				if (map.num_completions == 0) {
					map.lowest_moves = m;
					map.average_moves = m;
					map.num_completions = 1;
				} else {
					map.lowest_moves = Math.min(map.lowest_moves, m);
					map.average_moves = ((map.average_moves * map.num_completions) + m) / (map.num_completions + 1);
					map.num_completions++;
				}
			});
			map.save(function(err, savedMap) {
				if (!err) {
		 			res.status(200).json({'message' : 'Map successfully saved.'});
		 		} else {
		 			res.status(500).json({'error_message' : err.message});
		 		}
			});
		} else {
			res.status(200).json({'message' : 'This map does not exist.'});			
		}
	});
});

module.exports = router;