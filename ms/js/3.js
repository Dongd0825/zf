const { isNumber } = require("lodash");

/*
 实现多维对象的扁平化处理 
 处理后的结果
    {   
        1: 100,
        'a.b': 1,  
        'a.c': 2, 
        'a.d.e': 3,
        'a.d[2]': 200,  
        'b[0]': 1, 
        'b[1]': 2,    
        'b[2].a': 3,   
        'b[2].b': 4,  
        'c': 1
    }
 
 课后思考：编写unflatten，实现一维转多维? 类似的还有 Qs.stringify/parse 或者 JSON.stringify/parse！
 */
 const obj = {
  a: {
      b: 1,
      c: 2,
      d: { e: 3, 2: 200 },
  },
  b: [1, 2, { a: 3, b: 4 }],
  c: 1,
  1: 100,
  x: {}
};

Object.defineProperty(Object, 'flatten', {
  enumerable: false,
  configurable: true,
  writeable: true,
  value: function flatten(obj) {
    let result = {};
    function flat (obj, attr) {
      const isArray = Array.isArray(obj);
      const isObject = Object.prototype.toString.call(obj) === '[object Object]';

      if (isArray || isObject) {
        if (isObject && Object.keys(obj).length === 0) {
          result[attr] = {};
          return
        }
        if (isArray && obj.length === 0) {
          result[attr] = [];
          return
        }
        for(let _attr of  Object.keys(obj)) {
          let tempAttr = isNaN(_attr) ? `.${_attr}` :`[${_attr}]`;
          flat(obj[_attr], !attr ? _attr: attr + tempAttr);
        }
        // forEach 不是同步
        // Object.keys(obj).forEach((_attr, index) => {
        //   let tempAttr = isNaN(_attr) ? `.${_attr}` :`[${index}]`;
        //   flat(obj[attr], !attr ? _attr: attr + tempAttr);
        // })
        return
      }
      result[attr] = obj;
    }
    flat(obj, '');
    return result;
  }
})

// console.log(Object.flatten(obj));

Object.defineProperty(Object, 'unflatten', {
  enumerable: false,
  configurable: true,
  writeable: true,
  value: function flatten(obj) {
    let result = {};
    function flat (obj, attr) {
      const isArray = Array.isArray(obj);
      const isObject = Object.prototype.toString.call(obj) === '[object Object]';

      if (isArray || isObject) {
        if (isObject && Object.keys(obj).length === 0) {
          result[attr] = {};
          return
        }
        if (isArray && obj.length === 0) {
          result[attr] = [];
          return
        }
        for(let _attr of  Object.keys(obj)) {
          let tempAttr = isNaN(_attr) ? `.${_attr}` :`[${_attr}]`;
          flat(obj[_attr], !attr ? _attr: attr + tempAttr);
        }
        
        return
      }
      result[attr] = obj;
    }
    flat(obj, '');
    return result;
  }
})