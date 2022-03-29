const list = [1, 2, 3];
const square = num => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
}

let index = 0;
const test = async function test() {
  if (index >= list.length) {
    return;
  }
  const result = await square(list[index++]);
  console.log(result);
  test()
}
test()

// 1 4 9
// async function test () {
//   for (let _list of list) {
//     const value = await square(_list);
//     console.log(value); 
//   }
// }
// test()

 // 方案二：基于 for await of 循环处理
//  + 触发Symbol.asyncIterator这个方法执行「这个方法要遵循generator+iterator」，返回迭代器对象
//  + 每一轮循环都是 迭代器对象.next() -> {value:yeild后处理的值(promise实例),done:false}
// async function test() {
//   let index = 0;
//   list[Symbol.asyncIterator] = async function*() {
//     yield square(list[index++]);
//     yield square(list[index++]);
//     yield square(list[index++]);
//   }
//   for await (res of list) {
//     console.log(res); 
//   }
// }
// test();




