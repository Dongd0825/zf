export {}

abstract class Star {
  abstract listenPhone();
}

class AB extends Star {
  aviliable: false;
  listenPhone() {
    console.log('ab')
  }
}

class ABAgent extends Star {
  constructor(public ab: AB) {
    super();
    this.ab = ab;
  }
  listenPhone() {
    if (this.ab.aviliable) {
      console.log("ab agent");
    }
  }
}