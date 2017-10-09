const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] //It is used for encrypting the cookie. It can be any random value
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('Server started on port: '+PORT);
});
