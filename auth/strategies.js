var { Users } = require('../models');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var { register } = require('./index');

// ====
// Auth
// ====

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user._id || user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
  		usernameField: 'email'
  	},
    function(email, password, done) {
      Users.findOne({ email }, function (err, user) {
  			user = user.toObject();
        const userModel = new Users(user);

        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (userModel.validPassword(user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: '123947318298079',
    clientSecret: '7c24f46ffea1c5be66aa4b8e05a8911d',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const fbUser = {
      name: profile.name,
      email: profile.emails[0].value,
      services: {
        facebook: [
          {
            id: profile.id,
            accessToken,
            refreshToken
          }
        ]
      }
    };

    Users.findOne({ email: fbUser.email }, async function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        user = await register(fbUser);
        console.log(user);
        return cb(err, user);
      } else {
        console.log(user);
        return cb(err, user);
      }

    });
  }
));

  passport.use(new TwitterStrategy({
      consumerKey: 'fL4jVmZhz8UfxWomyMRbF4UDp',
      consumerSecret: 'CzVr3XuMvm6pMc5ac5ly6wLtORpGRZfV8waVHdIa1a5HN0He7i',
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      const twitterUser = {
        services: {
          twitter: [
            {
              id: profile.id,
              username: profile.username,
              token,
              tokenSecret
            }
          ]
        }
      }

      Users.findOne({ 'services.twitter.id': twitterUser.id }, async function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          user = await register(twitterUser);
          return done(err, user);
        } else {
          console.log(user);
          return done(err, user);
        }

      });

    }

  ));

}
