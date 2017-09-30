const express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!!!');
});

var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('Server started on port: '+PORT);
});
