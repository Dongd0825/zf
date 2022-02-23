const express = require('express');
const app = express();
app.get('/user', (req, res) => {
  res.json({id: req.query.id, name: 'zhufeng'})
})
app.listen('80', () => {
  console.log('')
})

