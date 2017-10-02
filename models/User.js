const mongoose = require('mongoose');
//const Schema = mongoose.Schema; Line 2 and Line 3 are same. Line 3 is the destructured ES6 equivalent
 const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
