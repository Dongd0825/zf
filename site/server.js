const express = require('express');
const logger = require('morgan');
// const compression = require('compression');
const delayConfig = require('./delayConfig');

const app = express();
app.use(logger('dev'));
app.use((req, res, next) => {
  const delay = delayConfig[req.url];
  if (delay) {
    setTimeout(next, delay);
  } else {
    next();
  }
})
// app.use(compression);//gzip压缩
app.use(express.static('public'))
app.listen(80, () => {
  console.log('服务器监听80端口');
});