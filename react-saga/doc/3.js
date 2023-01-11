// let EventEmitter = require('events');
import EventEmitter from 'events';

let e = new EventEmitter();
e.once('click',(data) => {
    console.log('clicked',data);
});
e.emit('click', 'data');
e.emit('click', 'data');