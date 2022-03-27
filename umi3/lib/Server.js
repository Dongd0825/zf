let express = require('express');
let http = require('http');

class Server {
  constructor() {
    this.app = new express();
  }
  async start ( ) {
    let listenApp = http.createServer(this.app);
    listenApp.listen(8000, () => {
      console.log('服务已经在8000端口启动');
    })
  }
}
module.exports = Server;