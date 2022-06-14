import { REACT_ELEMENT, REACT_TEXT } from "../constants";

export function toVDom(element) {
  return (typeof element === 'string' || typeof element === 'number') ? {
      $$typeof: REACT_ELEMENT,
      type: REACT_TEXT,
      props: element
  } : element;
}

/** 浅比较是否相等 */
export function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 != "object" || !obj1 || typeof obj2 != "object" || !obj2) {
    return false;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false
    }
  }
  return true;
}