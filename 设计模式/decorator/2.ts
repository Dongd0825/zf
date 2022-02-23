// // 轮子 https://github.com/jayphelps/core-decorators

import { readonly, decorate } from 'core-decorators';
// import { decorate } from './utils';
// // 类装饰器
// // 如果装饰器是修饰类
// namespace a {
//   interface Animal {
//     swings: number;
//     fly: any;
//   }
//   // 如果装饰器是修饰类 target 类的构造函数本身
//   // 也可以是一个装饰器工厂函数，
//   function flyable(swings) {
//     return (target) => {
//       target.prototype.swings = swings;
//       target.prototype.fly = function () {}
//       console.log(target);
//     }
//   }

//   @flyable(5)
//   class Animal {
//     constructor() {

//     }
//   }
//   let animal = new Animal();
//   console.log(animal.swings);
// }
// //——————————————————————————————————————
// // 属性装饰器
// // 如果装饰器是修饰属性
// namespace b {
//   interface Person {
//     protoName: string;
//   }

//   /**
//    * 实例属性装饰器
//    * @param target 类的原型对象
//    * @param key 实例属性名字
//    */
//   function instancePropteryDecorator(target, key) {
//     target.protoName = 'protoName1';
//     console.log('1', target, key);
//   }

//   /**
//    * 静态属性装饰器
//    * @param target 类的构造函数
//    * @param key 类的属性
//    */
//   function classPropteryDecorator(target, key) {
//     console.log('2', target, key);
//   }

//   /**
//    * 实例方法装饰器
//    * @param target 类的原型
//    * @param key 类的方法名
//    * @param descrption 属性描述符
//    */
//   function instanceMethodDecorator(target, key, descrption) {
//     console.log('3', target,key,descrption)
//   }

//   /**
//    * 类的方法装饰器
//    * @param target 类的构造函数
//    * @param key 类的方法名
//    * @param descrption 属性描述符
//    */
//   function classMethodDecorator(target, key, descrption) {
//     console.log('4', target, key, descrption);
//   }

//   class Person {
//     @instancePropteryDecorator
//     instanceProperty: string; // 实例熟悉
//     @classPropteryDecorator
//     static classProperty: string; // 静态属性
//     @instanceMethodDecorator
//     instanceMethod () { // 实例的方法

//     }
//     @classMethodDecorator
//     static classMethod() { // 实例的静态方法

//     }
//   }
//   const person = new Person();
//   console.log(person.protoName);
// }

// test core-decorate
namespace d {
  // interface Circle {
  //   pi: number;
  // }
  // function handleDescriptor(target: any, key: any, descriptor:any) {
  //   descriptor.writable = false;
  //   return descriptor;
  // }
  
  // // 自我实现 core-decorators
  // function readonly(...args:any) {
  //   console.log(args)
  //   // @ts-ignore
  //   return decorate(handleDescriptor, args);
  // }

  // function deprecate(target:any, methodName:any, descriptor:any) {
  //   let oldValue = descriptor.value;
  //   descriptor.value = (...args: any) => {
  //     let message = (
  //       `DESCRIPTION ${target.constructor.name} ${methodName} will be deprcated in future `
  //     )
  //     alert(message);
  //     return oldValue(...args);
  //   }
  // }

  // @ts-ignore
  // class Circle {
  //   @readonly
  //   pi: number = 1
  //   @deprecate
  //   getName() {

  //   }
  // }
  // const circle = new Circle();
  // circle.pi = 3;
  // console.log(circle);
}
