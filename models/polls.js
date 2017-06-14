var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	title: String,
	options: [String],
	votes: [Number],
	creator: {type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model('Poll', Poll);
