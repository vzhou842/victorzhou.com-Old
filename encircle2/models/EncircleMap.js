var mongoose = require('mongoose');

module.exports = mongoose.model('EncircleMap', {
    map : String,
    title : { type : String, index : true },
    description : String,
    creator : { type : String, default : 'Unknown', index : true },
    plays : { type : Number, default : 0, index : true },
    createdAt : { type : Date, index : true },
    invisibility : { type : Boolean, default : false },
    two_turtles : { type : Boolean, default : false },
    vortex : { type : Boolean, default : false },
});