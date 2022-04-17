export const isObject = (val) => Object.prototype.toString.call(val) === '[object Object]';
export const isArray = (val) => Object.prototype.toString.call(val) === '[object Array]';
export const isFunction = (val) => Object.prototype.toString.call(val) === '[object Function]';
