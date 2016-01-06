var mongoose = require('mongoose');

module.exports = mongoose.model('EncircleMap', {
    map : String,
    title : String,
    description : String,
    creator : { type : String, default : 'Unknown' },
    plays : { type : Number, default : 0},
    createdAt : Date,
});