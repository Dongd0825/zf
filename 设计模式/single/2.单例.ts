class MyWindow {
  // 私有静态熟悉
  private static instance: MyWindow;
  private constructor() {
    
  }
  static getInstance() {
    if (!MyWindow.instance) {
      MyWindow.instance = new MyWindow();
    }
    return MyWindow.instance;
  }
}

const w1 = MyWindow.getInstance();
const w2 = MyWindow.getInstance();
console.log(w1 === w2);

// "use strict";

// var MyWindow = /*#__PURE__*/function () {
//   // 私有静态熟悉
//   function MyWindow() {}

//   MyWindow.getInstance = function getInstance() {
//     if (!MyWindow.instance) {
//       MyWindow.instance = new MyWindow();
//     }

//     return MyWindow.instance;
//   };

//   return MyWindow;
// }();

// var w1 = MyWindow.getInstance();
// var w2 = MyWindow.getInstance();
// console.log(w1 === w2);