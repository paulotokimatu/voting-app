var Polls = require("../models/polls.js");
var Users = require("../models/users.js");

function PollHandler() {
    this.getProfile = function(req, res) {
        Users.find({"twitter.id": req.user.twitter.id}).populate("polls").exec((err, user) => {
            if (err) throw err;
            res.render("user_profile", {user: user[0]});
        });
    };
}

module.exports = PollHandler;