import EventEmmit from 'events';

class Girl extends EventEmmit {
  constructor(name) {
    super();
    this.name = name;
  }
}

const girlEvent = new Girl('Girl');
girlEvent.once('loseLover', () => {
  console.log('gir is crying');
})

girlEvent.on('loseLover', () => {
  console.log('girl is crying');
})

girlEvent.emit('loseLover');
girlEvent.removeListener('loseLover', () => {
  console.log('移除loseLover');
  girlEvent.emit('loseLover');
});

