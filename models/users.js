var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    twitter: {
        name: String,
        id: String
    },
	polls: [{type: Schema.Types.ObjectId, ref: "Poll"}],
});

module.exports = mongoose.model('User', User);
