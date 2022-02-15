// es5
// 缺点， 用户使用必须要有getInstance 方法
function MyWindow1 () {

}

MyWindow1.prototype.getHello = () => {
  console.log('hello');
}

/** 方法1 */
// MyWindow1.getInstance = (() => {
//   let instance: Window;
//   return () => {
//     if (!instance) {
//       instance = new MyWindow1();
//     }
//     return instance;
//   }
// })();

/** 方法2 */
MyWindow1.getInstance = () => {
  // @ts-ignore
  if (!MyWindow1.instance) {
    // @ts-ignore
    MyWindow1.instance = new MyWindow1();
  }// @ts-ignore
  return MyWindow1.instance;
}

const w11 = MyWindow1.getInstance();
const w21 = MyWindow1.getInstance();
console.log(w11 === w21);
