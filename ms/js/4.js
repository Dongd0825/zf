/* 
第二题：URL问号传参解析 
例如：url地址是 http://www.zhufengpeixun.cn/?lx=1&name=js#video
编写queryURLParams方法实现出：
  + url.queryURLParams() -> {lx:1,name:'js',HASH:'video'}
  + url.queryURLParams('name') -> 'js'
*/

const res = require("express/lib/response");

const str = 'http://www.zhufengpeixun.cn/?lx=1&name=js#video';
// Object.defineProperty(String.prototype, 'queryURLParams', {
//   configurable: true,
//   enumerable: false,
//   writeable: true,
//   value: function queryURLParams(key) {
//     const self = this;
//     const reg = /\?(.*)#(\w+)/g;
//     const arr = reg.exec(self);
//     const queryArr = arr[1];
//     const hash = arr[2];
//     const result = {};
//     queryArr.split('&').forEach(queryStr => {
//       const tmp = queryStr.split('=');
//       result[tmp[0]] = tmp[1];
//     })
//     result.HASH = hash;
//     if (key) {
//       return result[key] || ""
//     } 
//     return result
//   }
// })

Object.defineProperty(String.prototype, 'queryURLParams', {
  configurable: true,
  enumerable: false,
  writeable: true,
  value: function queryURLParams(key) {
    const self = this,
          result = {};
    self.replace(/#([^#?&=]+)/g, (_, $1) => result.HASH = $1);
    self.replace(/([^#?&=]+)=([^#?&=]+)/g, (_, $1, $2) => result[$1] = $2);
    return typeof key === undefined ? result : result[key]
  }
})
console.log(str.queryURLParams());
console.log(str.queryURLParams('name'));
