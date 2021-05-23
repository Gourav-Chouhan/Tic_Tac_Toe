"use strict";

var express = require('express');

var app = express();
app.listen(3000, function () {
  return console.log("listning on 3000 port");
});
app.use(express["static"]('public'));
app.use(express.json({
  limit: '1mb'
}));
app.post('/api', function (request, response) {
  console.log(request.body);
});