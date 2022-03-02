function factorial(num: number): number {
  console.log('计算')
  if (num <= 1) {
    return 1;
  } 
  return num * factorial(num - 1);
}

function proxyFactorial(fn:any) {
  let cache:any = {};
  return function (num:number) {
    if (num in cache) {
      return cache[num];
    }
    return cache[num] = fn(num);
  }
}

console.log(1, proxyFactorial(factorial)(3));
