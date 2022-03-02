/**
 * vue2 Object.defineProperty
 * vue3 proxy 区别
 * 
 * Proxy代理整个对象，Object.defineProperty只代理对象上的某个属性；
  数组新增删除修改时，Proxy可以监听到；
  Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
  如果对象内部要全部递归代理，则Proxy可以只在调用时递归，而Object.defineProperty需要在一开始就全部递归，Proxy性能优于Object.defineProperty；
  对象上定义新属性时，Proxy可以监听到；
 */

 /**
  * 代理 vs 适配器
  *   适配器提供不同接口，代理模式提供一模一样的接口
  * 代理 vs 装饰器
  *   装饰器模式原来的功能不变，还可以使用，代理模式改变原来的功能
  */