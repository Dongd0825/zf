// const isPlainObject = function isPlainObject(obj) {
//   let proto, Ctor;
//   if (!obj || toString.call(obj) !== "[object Object]") return false;
//   proto = getProto(obj);
//   if (!proto) return true;
//   Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
//   return typeof Ctor === "function" && Ctor === Object;
// };

// export {isPlainObject}