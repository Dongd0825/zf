const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';
const numberTag = '[object Number]';

const deepTags = [mapTag, setTag, arrayTag, objectTag, argsTag];

function getType(target: any) {
  return Object.prototype.toString.call(target);
}

function getInit(target: any) {
  if (target.__proto__) {
    return Object.create(target.__proto__);
  } 
}

function cloneSymbol(target: any) { // 
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneReg(target: any) {
  const regFlags = /\w*$/;
  const result = new target.constructor(target.source, regFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

function cloneFunction(func: any) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcStr = func.toString();
  if (funcStr.prototype) {
    const params = funcStr.exec(paramReg);
    const body = funcStr.exec(bodyReg);
    if (body) {
      if (params) {
        const paramArr = params[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcStr);
  }
}

function cloneOtherType(target:any , type: any) {
  const Ctor = target.constructor;
  switch(type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
        return new Ctor(target);
    case regexpTag:
        return cloneReg(target);
    case symbolTag:
        return cloneSymbol(target);
    case funcTag:
        return cloneFunction(target);
    default:
        return null;
  }
}

function forEach(array: any[], iteratee: any) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    const result = iteratee(array[index], index, array);
    if (result === false) {
      break;
    }
  }
  return array;
}
/**
 * 1. 根据拷贝对象类型，创建新对象
 * 2. 查看缓存是否有要拷贝的对象，有则支持返回，否则存缓存
 * 3. 如果是map set array object类型则深拷贝
 * 
 * @param target 被拷贝对象
 * @param cache 缓存 防止循环引用
 * @returns 
 */
function cloneDeep(target: any, cache: WeakMap<any, any> = new WeakMap()) {
  if (typeof target !== 'object' || !target) {
    return target;
  }

  const type = getType(target);

  let cloneTarget: any;
  if (deepTags.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  if (cache.get(target)) {
    return cache.get(target);
  }
  cache.set(target, cloneTarget);

  if (type === setTag) {
    target.forEach((_v: any) => {
      cloneTarget.add(cloneDeep(_v));
    })
    return cloneTarget;
  } 
  if (type === mapTag) {
    target.forEach((_v: any) => {
      cloneTarget.set(_v, cloneDeep(_v));
    })
    return cloneTarget;
  }
  
  const keys = Array.isArray(target) ? undefined: Object.keys(target);
  forEach(keys || target, (value: any, key: number) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = cloneDeep(target[key], cache);
  })
  return cloneTarget;
}

export default cloneDeep;