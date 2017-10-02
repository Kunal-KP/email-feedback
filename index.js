const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);
const app = express();

require('./routes/authRoutes')(app);

var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('Server started on port: '+PORT);
});
