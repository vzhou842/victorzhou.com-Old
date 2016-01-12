var mongoose = require('mongoose');

var encircleMapSchema = new mongoose.Schema({
    map : String,
    title : { type : String, index : true },
    description : String,
    creator : { type : String, default : 'Unknown', index : true },
    plays : { type : Number, default : 0 },
    createdAt : { type : Date, index : true },
    invisibility : { type : Boolean, default : false },
    two_turtles : { type : Boolean, default : false },
    vortex : { type : Boolean, default : false },
    rating : { type : Number, default : 0 },
    num_ratings : { type : Number, default : 0 },
    lowest_moves : { type : Number, default : -1 },
    average_moves : { type : Number, default : -1 },
    num_completions : { type : Number, default : 0 },
});

encircleMapSchema.index({ plays : 1, rating : 1});

module.exports = mongoose.model('EncircleMap', encircleMapSchema);