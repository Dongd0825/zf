class Socket {
  output() {
    return '240v';
  }
}

abstract class Power {
  abstract charge(): string;
}

class PowerAdapter extends Power {
  constructor(public socket: Socket) {
    super();
  }
  charge() {
    return this.socket.output() + '24v';
  }
}