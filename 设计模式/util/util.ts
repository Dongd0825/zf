import _, { PropertyPath } from 'lodash';

export const defaultDelayTime = 300;

type FmtPoint = {
  w: number;
  h: number;
  x: number;
  y: number;
}

/**
 * 创建一个从 object 中选中的属性的对象
 * @param obj 
 * @param strArr 
 * @returns 
 */
 export function pick<T extends Record<string, any>, P extends keyof T>(obj: T, strArr: P[]) {
  let newObj = {} as Pick<T, P>;
  strArr.forEach((prop) => {
    if (prop !== void 0) {
      newObj[prop] = obj[prop];
    }
  })
  return newObj;
}

/**
 * 这个方法一个对象，这个对象忽略 predicate（断言函数）判断不是真值的属性后，object自身和继承的可枚举属性组成
 * @param obj 
 * @param predicate 
 * @returns 
 */
export function omitBy<T extends Record<string, any>, P extends (value: any, key: string) => boolean>(obj: T, predicate: P) {
  let newObj = {} as any;
  const keys = Object.keys(obj);
  keys.forEach((_key: string) => {
    if (!predicate(obj[_key], _key)) {
      newObj[_key] = obj[_key];
    }
  })
  return newObj;
}

/**
 * 这个方法一个对象，这个对象求取predicate（断言函数）判断是真值的属性后，object自身和继承的可枚举属性组成
 * @param obj 
 * @param predicate 
 * @returns 
 */
export function pickBy<T extends Record<string, any>, P extends (value: any, key: string) => boolean>(obj: T, predicate: P) {
  let newObj = {} as any;
  const keys = Object.keys(obj);
  keys.forEach((_key: string) => {
    if (predicate(obj[_key], _key)) {
      newObj[_key] = obj[_key];
    }
  })
  return newObj;
}

/** 获取唯一id */
export const uuid = () => {
  return (Math.random() * 10000000000 + Math.random() * 100000 + Date.now()).toString(36);
}

/** 根据参数获取判断类型函数 */
export function isType(object: any) {
  return (type: string) => {
    return Object.prototype.toString.call(object) === `[object ${type}]`;
  }
}

export const isNumber = (obj: any) => isType(obj)('Number');
export const isArray = (obj: any) => isType(obj)('Array');
export const isBoolean = (obj: any) => isType(obj)('Boolean');
export const isObject = (obj: any) => isType(obj)('Object');
export const isNull = (obj: any) => isType(obj)('Null');
export const isUndefined = (obj: any) => isType(obj)('Undefined');
export const isFunction = (obj: any) => isType(obj)('Function');
export const isSymbol = (obj: any) => isType(obj)('Symbol');


/** 获取鼠标移动方向
 * @params x x轴坐标差值 可为负
 * @params y y轴坐标差值 可为负
 */
 export function getDIR(x: number, y: number) {
  if (x > 0 && Math.abs(x) > Math.abs(y)) {
      // console.log('向右');
      return 'right';
  } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
      // console.log('向左');
      return 'left';
  } else if (y > 0 && Math.abs(y) > Math.abs(x)) {
      // console.log('向下');
      return 'bottom';
  } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
      // console.log('向上');
      return 'top';
  }
}
export const parseData = (dataField: any[], resData: any[]) => {
  const retData = resData.map((i: any) => {
      let dataItem = { ...i };
      dataField.forEach((j: { key: string | number; value: PropertyPath }) => {
          dataItem[j.key] = _.map([i], _.property(j.value))[0] || '';
      });
      return dataItem;
  });
  return retData;
};

export function getMaxAxis(node: FmtPoint[], type: 'x' | 'y'): number {
  let arr: number[] = [];
  node.forEach(({ x, y, w, h }: FmtPoint) => {
      if (type === 'x') {
          arr.push(x);
          arr.push(x + w);
      } else if (type === 'y') {
          arr.push(y);
          arr.push(y + h);
      }
  });
  const min = [...arr].sort((a: number, b: number) => a - b)[0];
  const max = [...arr].sort((a: number, b: number) => b - a)[0];
  return max - min;
}

export function mapArray<T>(source: T[], cb: (_: T) => any) {
  return source.map((_: T) => {
      return cb(_);
  });
}

export function debounce<T extends (...args: any) => any>(fn: T, delayTime?: number) {
  delayTime = delayTime ?? defaultDelayTime;
  let timer: number = 0;
  return (...args: any) => {
      timer && clearTimeout(timer) && (timer = 0);
      timer = window.setTimeout(() => {
          // @ts-ignore
          fn.apply(this, args);
      }, delayTime);
  };
}

export function throttle<T extends (...args: any) => any>(fn: T, delayTime?: number) {
  delayTime = delayTime ?? defaultDelayTime;
  let timer: number = 0;
  return (...args: any) => {
      timer = window.setTimeout(() => {
        // @ts-ignore
          fn.apply(this, args);
          clearTimeout(timer);
          timer = 0;
      }, delayTime);
  };
}

export const getLenthAfterPoint = (v: number) => {
  let _v;
  try {
      _v = v.toString().split('.')[1].length;
  } catch (f) {
      _v = 0;
  }
  return _v;
};

export const add = (a: number, b: number) => {
  let c, d, e;
  c = getLenthAfterPoint(a);
  d = getLenthAfterPoint(b);
  e = Math.pow(10, Math.max(c, d));
  return (mul(a, e) + mul(b, e)) / e;
};

export const sub = (a: number, b: number) => {
  let c, d, e;
  c = getLenthAfterPoint(a);
  d = getLenthAfterPoint(b);
  e = Math.pow(10, Math.max(c, d));
  return (mul(a, e) - mul(b, e)) / e;
};

export const mul = (a: number, b: number) => {
  let c = 0;
  let d = a.toString();
  let e = b.toString();
  c += getLenthAfterPoint(a);
  c += getLenthAfterPoint(b);
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c);
};

export const div = (a: number, b: number) => {
  let c;
  let d;
  let e = 0;
  let f = 0;
  e = getLenthAfterPoint(a);
  f = getLenthAfterPoint(b);
  c = a.toString().replace('.', '');
  d = b.toString().replace('.', '');
  if (c.length > 10 || d.length > 10) {
      let max = Math.pow(10, 14);
      return Math.round((a / b) * max) / max;
  }
  return mul(Number(c) / Number(d), Math.pow(10, f - e));
};


export const formatObjectToRgba = <
    T extends {
        r?: number | string;
        g?: number | string;
        b?: number | string;
        a?: number | string;
    },
>(
    colorObject: T,
) => {
    return `rgba(${colorObject.r}, ${colorObject.g}, ${colorObject.b}, ${colorObject.a})`;
};

export const formatHexToRgbaObject = (hex = '#rrggbb') => {
  const hexStr: string = hex.slice(1);
  const len = hexStr.length;
  const n = Math.floor(len / 3);
  const reg1 = /(\w{2})(\w{2})(\w{2})/g;
  const reg2 = /(\w{1})(\w{1})(\w{1})/g;
  const reg3 = /(\w{2})(\w{2})(\w{2})(\w{2})/g;
  const reg4 = /(\w{1})(\w{1})(\w{1})(\w{1})/g;

  // #rgb
  if (len % 3 === 0) {
      if (n === 2) {
          // @ts-ignore
          const [, r, g, b] = [...hexStr.matchAll(reg1)][0];
          return {
              r: parseInt(r, 16),
              g: parseInt(g, 16),
              b: parseInt(b, 16),
          };
      }
      if (n === 1) {
          // @ts-ignore
          const [, r, g, b] = [...hexStr.matchAll(reg2)][0];
          return {
              r: parseInt(r, 16),
              g: parseInt(g, 16),
              b: parseInt(b, 16),
          };
      }
  } else if (len % 4 === 0) {
      //rgba
      if (n === 2) {
          // @ts-ignore
          const [, r, g, b, a] = [...hexStr.matchAll(reg3)][0];
          const _a = parseInt(a, 16) / 255;
          return {
              r: parseInt(r, 16),
              g: parseInt(g, 16),
              b: parseInt(b, 16),
              a: _a, // TODO 小数点后4位？
          } as any;
      }
      if (n === 1) {
          // @ts-ignore
          const [, r, g, b, a] = [...hexStr.matchAll(reg4)][0];
          const _a = parseInt(a, 16) / 255;
          return {
              r: parseInt(r, 16),
              g: parseInt(g, 16),
              b: parseInt(b, 16),
              a: _a,
          };
      }
  }
};


// TODO
/**
 * 时间格式化
 * @param d
 * @param fmt
 */
 export const dataFormat = (d: number | Date, fmt = 'yyyy-MM-dd hh:mm'): string => {
  const date = new Date(d)
  const time: any = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S+': date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    // eslint-disable-next-line no-param-reassign
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  // eslint-disable-next-line no-restricted-syntax
  for (const k in time)
    if (new RegExp(`(${k})`).test(fmt))
      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (time[k]) : ((`00${time[k]}`).substr((`${time[k]}`).length)));
  return fmt;
}

export class QuickSort<T> {
  private arr: T[];

  private readonly dimensions: { name: string; type?: 'date' }[];

  constructor(arr: T[], ...dimensions: { name: string, type?: 'date' }[]) {
    this.arr = arr;
    this.dimensions = dimensions;
  }

  /**
   * 比较值
   * 右边大输出true
   * 左边大输出false
   * @param left
   * @param right
   * @return {Boolean}
   */
  compare(left: T, right: T): boolean | void {
    if (this.dimensions && this.dimensions.length > 0) {
      for (let i = 0; i < this.dimensions.length; i++) {
        const dimension = this.dimensions[i];
        let lVal;
        let rVal;
        switch (dimension.type) {
          case 'date':
            // @ts-ignore
            lVal = new Date(left[dimension.name]).getTime();
             // @ts-ignore
            rVal = new Date(right[dimension.name]).getTime();
            break;
          default:
             // @ts-ignore
            lVal = Number(left[dimension.name]);
             // @ts-ignore
            rVal = Number(right[dimension.name]);
        }
        if (lVal !== rVal) {
          return lVal < rVal;
        }
      }
    } else {
      return Number(left) < Number(right);
    }
  }

  sort(arr = this.arr): T[] {
    if (arr.length <= 1) {
      return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
      if (this.compare(arr[i], pivot)) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return this.sort(left).concat([pivot], this.sort(right));
  }
}

export const urlParams = (url?: string): object => {
  // eslint-disable-next-line no-param-reassign
  url = url || window.location.search;
  let match;
  const pl = /\+/g;  // Regex for replacing addition symbol with a space
  const search = /([^&=]+)=?([^&]*)/g;
  const decode = (s: string) => {
    return decodeURIComponent(s.replace(pl, ' '));
  };

  const query = url?.[0] === '?' ? url.slice(1) : url;

  const obj = {} as any;
  // eslint-disable-next-line no-cond-assign
  while (match = search.exec(query)) {
    obj[decode(match[1])] = decode(match[2]);
  }
  /* eslint-enable */
  return obj;
};

export function checkType(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export const checkImgSize = async (file: Blob, width?: number, height?: number, isSquare?: boolean) => {
  return new Promise(res => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // eslint-disable-next-line func-names
    reader.onload = function(ele: any) {
      const img = new Image();
      img.src = ele.target.result;
      // eslint-disable-next-line func-names
      img.onload = function() {
        let result = true;
        if (width) {
          // @ts-ignore
          result = result && this.width === width;
        }
        if (height) {
          // @ts-ignore
          result = result && this.height === height;
        }
        // 校验是否为1:1图片
        if (isSquare) {
          // @ts-ignore
          result = result && (this.width / this.height) === 1
        }
        res(result);
      };
    };
  });
};

