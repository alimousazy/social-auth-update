let User = require('../models/user.js');
 module.exports = {
    configure : function (config) {
        let FacebookStrategy =  require('passport-facebook');
        this.passport =  require('passport');
        this.passport.use(new FacebookStrategy({
            clientID: config.facebook.consumerKey,
            clientSecret: config.facebook.consumerSecret,
            callbackURL: config.facebook.callbackUrl,
            enableProof: false
          },
          function(accessToken, refreshToken, profile, done) {
            User.findOrCreate({ facebookId: profile.id, accessToken: accessToken, refreshToken: refreshToken }, function (err, user) {
              return done(err, user);
            });
          }
        ));
        this.passport.serializeUser(function(user, done) {
              done(null, user);
        });
        this.passport.deserializeUser(function(user, done) {
              done(null, user);
        });
    }
};
