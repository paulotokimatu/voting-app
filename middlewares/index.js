var PollHandler = require("../controllers/server.poll_handler.js");
var pollHandler = new PollHandler();

module.exports = {
    //middleware to check if user is logged in
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash("error", "You must be logged!");
            res.redirect("/");
        }
    },
    //middleware to check if the user is owner of the poll
    isOwner: (req, res, next) => {
        pollHandler.isOwner(req, res, next);
    },
    //Check if there any duplicated options in a new poll
    isValidPoll: (req, res, next) => {
        var newPollOptions = req.body.options;
        if(newPollOptions.length === new Set(newPollOptions).size) {
            next();
        }
        else {
            req.flash("error", "You cannot make a poll with duplicated options!");
            res.redirect("/");
        }
    }
}
    