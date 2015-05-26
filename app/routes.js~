module.exports =  (app) => {
    let graph = require('fbgraph');
    let passport = require('passport');
    let isLoggedIn = require('./middlewares/isLoggedIn.js');
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_status', 'read_stream', 'publish_actions', 'user_likes'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) { 
        res.redirect('/timeline');
    });
    app.get('/timeline', (req, res) => {
        console.log(req.user);
        graph.setAccessToken(req.user.accessToken);
        graph.get("me/home", function(err, response) {
            res.render('timeline.ejs', {
                posts: response.data
            });
        });
    });
    app.get('/login', (req, res) => {
        res.render('login.ejs', {message: req.flash('error')});
    });

    app.get('/reply/:id', isLoggedIn, (req, res) => {
        graph.setAccessToken(req.user.accessToken);
        graph.get(req.params.id, function(err, response) {
            console.log(response);
            res.render('reply.ejs', {
                post: response,
                message: req.flash('error')
            });
        });
    });
    app.get('/compose', isLoggedIn, (req, res) => {
        res.render('compose.ejs', {message: req.flash('error')});
    });
    app.get('/profile', isLoggedIn, (req, res) => {
        graph.setAccessToken(req.user.accessToken);
        graph.get('/me', function(err, response) {
            console.log(response);
            res.render('profile.ejs', {
                user: {
                    facebook : response
                },
                message: req.flash('error')
            });
        });
    });
     app.post('/compose', isLoggedIn, (req, res) => {
        graph.setAccessToken(req.user.accessToken);
        graph.post('/feed', { message: req.body.reply },  function(err, response) {
            console.log(response);
            console.log(err);
            if(!err)
            {
                res.redirect('/timeline');
                return;
            }
            req.flash('error', err);
            res.redirect('/compose');
        });
    });

    app.get('/logout', isLoggedIn, function(req, res){
          req.logout();
            res.redirect('/');
    });


    app.post('/reply/:id', isLoggedIn, (req, res) => {
        graph.setAccessToken(req.user.accessToken);
        graph.post(req.params.id + "/comments", { message: req.body.reply },  function(err, response) {
            console.log(response);
            console.log(err);
            if(!err)
            {
                res.redirect('/timeline');
                return;
            }
            res.redirect('/reply/' + req.params.id);
        });
    });

    app.get('/', (req, res) => {
        res.render('index.ejs', {message: req.flash('error')});
    });

};
