var Polls = require("../models/polls.js");
var Users = require("../models/users.js");

function PollHandler() {
    this.getPolls = function(req, res) {
        Polls.find({}, (err, poll) => {
            if (err) throw err;
            else {
                res.send(poll);
            }
        });
    };
    this.addPoll = function(req, res, poll) {
        //Check if the user typed all fileds correctly
        if (poll.title === "" || poll.options.length < 2) {
            res.redirect("/");
        }
        else {
            Users.find({"twitter.id": req.user.twitter.id}, (err, user) => {
                if (err) throw err;
                //Add info about the user who created the poll
                poll.creator = user[0]._id;

                Polls.create(poll, (err, newPoll) => {
                    if (err) throw err;
                    //UpdateAdd the new poll to the User object
                    var pollsCurrentUser = user[0].polls;
                    pollsCurrentUser.push(newPoll._id);
                    Users.update({"twitter.id": req.user.twitter.id}, {polls: pollsCurrentUser}, () => {
                        res.redirect("/polls/" + newPoll._id);
                    });
                });
            });
        }
    };
    this.getOnePoll = function(req, res) {
        Polls.find({_id: req.params.id}).populate("creator").exec((err, poll) => {
            if (err) throw err;
            res.render("one_poll", {poll: poll[0], user: req.user});
        });
    };
    this.updatePoll = function(req, res, updatedPoll) {
        Polls.find({_id: updatedPoll._id}, (err, poll) => {
            if (err) throw err;
            var newOptions = poll[0].options;
            var newVotes = poll[0].votes;
            var votedOption;
            newOptions.forEach((option, index) => {
                if (option === updatedPoll.option) {
                    votedOption = index;
                }
            });
            newVotes[votedOption] += 1;
            Polls.update({_id: updatedPoll._id}, {votes: newVotes}, (newPoll) => {
                res.redirect("/polls/" + updatedPoll._id);
            });
            
        });
    };
    this.deletePoll = function(req, res) {
        Polls.find({_id: req.params.id}, (err, poll) => {
            if (err) throw err;
            console.log("ok")
            Users.find({"twitter.id": req.user.twitter.id}, (err, user) => {
                if (err) throw err;
                
                var userPolls = user[0].polls;
                var indexToRemove = userPolls.indexOf(poll[0]._id);
                if (indexToRemove > -1) userPolls.splice(indexToRemove, 1);
                
                Polls.remove({_id: req.params.id}, (err) => {
                    if (err) throw err;
                    //Only remove poll from the User if it was successfully deleted
                    Users.update({"twitter.id": req.user.twitter.id}, {polls: userPolls}, () => {
                        res.send("ok");
                    });
                });
            });
        });
    };
    this.isOwner = function(req, res, next) {
        if (req.isAuthenticated()) {
            Polls.find({_id: req.params.id}).populate("creator").exec((err, poll) => {
                if (err) throw err;
                if (req.user.twitter.id == poll[0].creator.twitter.id) {
                    return next();
                }
                else  {
                    req.flash("error", "You cannot delete polls from other users!");
                    res.send("error");
                }
            });
        }
        else {
            req.flash("error", "You need to log in to do that!");
            res.send("error");
        }
        
    };
}

module.exports = PollHandler;