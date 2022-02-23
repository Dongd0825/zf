const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '3.html'));
})

app.get('/images/:name', function(req, res) {
  console.log({req})
  // setTimeout(function() {
    res.sendFile(path.join(__dirname, req.path));
  // }, 30000)
})

app.listen(7001, function() {
  console.log('listen 7001')
})