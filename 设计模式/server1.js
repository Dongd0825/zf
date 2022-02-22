const express = require('express');
const app = express();
const path = require('path');

let todos = [{id:1, text: 'a', complete: false},{id:2, text: 'a2', complete: false},{id:3, text: 'a3', complete: false},{id:4, text: 'a4', complete: false}];
      
app.get('/todos', function(req, res) {
  res.sendFile(path.join(__dirname, 'todo.html'));
})

app.get('/getTodos', function(req, res) {
  res.json(todos);
})

app.get('/toggle/:id', function(req, res) {
  let id = req.params.id;
  todos = todos.map((_todo) => {
    if (_todo.id == id) {
      _todo.complete = !_todo.complete
    } 
    return _todo;
  })
  res.json(todos);
})

app.listen(7001, function() {
  console.log('listen 7001');
})