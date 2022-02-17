// export {}
// 
abstract class Shape {
  abstract draw(): void;
}

class Circle extends Shape{
  draw() {
    return 'circle';
  }
}

class Rectangle extends Shape {
  draw() {
    return 'rectangel';
  } 
}

class Star extends Shape {
  draw() {
    return 'Star';
  } 
}

abstract class ColorShape extends Shape {
  constructor(public shape: Shape) {
    super();
  }
  abstract draw(): void;
}

class RedColorShape extends ColorShape {
  draw() {
    this.shape.draw();
    console.log(this.shape.draw() + '边框红色');
  }
}

class GreenColorShape extends ColorShape {
  draw() {
    this.shape.draw();
    console.log(this.shape.draw() + '边框绿色');
  }
}

const redColorShape = new RedColorShape(new Circle());
redColorShape.draw();

const redStart = new RedColorShape(new Star());
redStart.draw();