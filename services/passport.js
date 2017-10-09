const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// After the user is saved in the db, the serializeUser function is called which will take the user object and generate an
// identifying token for that user and stuffs it inside a cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserializeUser function retrieves user from the  earlier created during serializeUser function by using the id
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
})

passport.use(new GoogleStrategy(
  {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
  /*console.log('accessToken: '+accessToken);
  console.log('refreshToken: '+refreshToken);
  console.log('profile: '+ JSON.stringify(profile));*/
    User.findOne({ googleId: profile.id }).then(existingUser => {
      if(existingUser) {
        done(null, existingUser);
      } else {
        new User({ googleId : profile.id })
        .save()
        .then(user => done(null, user));
      }
      });
    }
  )
);
