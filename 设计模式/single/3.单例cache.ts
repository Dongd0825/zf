const express = require('express');
const cache ={}

const app = express();
app.get('/app', function(res) {
  cache[app] = res;
})
