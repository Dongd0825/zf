/**
 * 利用装饰器做无痕埋点
 */


 import React from 'react';

 class Log extends React.Componnet {

  function clickAfter(beforeFn) {
    return function (target, methodName, descriptor) {
      const oldFn = descriptor.value;
      descriptor.value = function (...args) {
        beforeFn.call(this, ...args);
        const result = oldFn.call(this, ...args);
        return result;
      }
    }
  }

   @clickAfter(() => { console.log('fetch api to records click')})
   function click() {

   }
   render() {
     <div>
     </div
   }
 }