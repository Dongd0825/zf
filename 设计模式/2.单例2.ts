// 透明单例模式
// 像正常使用类一样 调用

let MyWindow2 = (() => {
  // @ts-ignore
  let _window: MyWindow2;
  // @ts-ignore
  let MyWindow2 = function(this: MyWindow2) {
    if (_window) {
      return _window;
    } else {
      _window = this;
    }
  }
  return MyWindow2;
})()

const w3 = new (MyWindow2 as any)();
const w4 = new (MyWindow2 as any)();
console.log(w3 === w4);