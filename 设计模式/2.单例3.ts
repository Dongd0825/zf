// 单例与构造函数的分离
function MyWindow3 () {}

MyWindow3.prototype.hello2 = () => {}

let createInstance = function (Constructor) {
  // @ts-ignore
  let instance: Constructor;
  return function AnyConstructor(...args) {
    if (!instance) {
      // this __proto__ == AnyConstructor
      Constructor.apply(this, args);
      // 修正 this __proto == Constructor
      Object.setPrototypeOf(this, Constructor.prototype);
      instance = this;
    } 
    return instance;
  }
};

const createWindowInstance = createInstance(MyWindow3)
const w5 = new (createWindowInstance as any)();
const w6 = new (createWindowInstance as any)();
console.log(w5 === w6);
