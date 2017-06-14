var PollHandler = require("../controllers/server.poll_handler.js");
var UserHandler = require("../controllers/server.user_handler.js");
var mw = require("../middlewares");
var passportTwitter = require('../auth/twitter');

function routes(app) {
    var pollHandler = new PollHandler();
    var userHandler = new UserHandler();
    
    app.route('/auth/twitter').get(passportTwitter.authenticate('twitter'), (req, res) => {
        res.send("ok");
    });

    app.route('/auth/twitter/callback').get(passportTwitter.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
        // Successful authentication
        res.redirect("/");
        //res.json(req.user);
    });

    app.route("/").get((req, res) => {
        res.render("index", {user: req.user});
    });
    
    app.route("/profile").get(mw.isLoggedIn, (req, res) => {
        userHandler.getProfile(req, res);
    });
    
    app.route("/logout").get(mw.isLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    app.route("/get-polls").get((req, res) => {
        pollHandler.getPolls(req, res);
    });
    
    app.route("/add-poll").post(mw.isLoggedIn, mw.isValidPoll, (req, res) => {
        var options;
        if(typeof req.body.options == "string") {
            options = [req.body.options];
        }
        else options = req.body.options;
        var votes = [];
        for (var i = 0; i < options.length; i++) {
            votes.push(0);
        }
        var newPollData = {
            title: req.body.title,
            options: req.body.options,
            votes: votes
        };
        pollHandler.addPoll(req, res, newPollData);
    });
    
    app.route("/polls/:id").get((req, res) => {
    //app.route(/polls\/(.+)/).get((req, res) => {
        pollHandler.getOnePoll(req, res);
    });
    
    app.route("/polls/:id").delete(mw.isOwner, (req, res) => {
        pollHandler.deletePoll(req, res);
    });
    
    app.route("/update-poll").post((req, res) => {
        pollHandler.updatePoll(req, res, req.body);
    });
    
    app.use(function (req, res, next) {
        res.status(404).send("Page not found!");
    });
}
    
module.exports = routes;
