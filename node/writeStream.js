import fs from 'fs';
// 默认读64kb数据
const ws = fs.createWriteStream('./1.txt', {
  highWaterMark: 1 // 默认写16kb，最合理的大小
});
// 不能一次写入，只能写一部分，剩余48kb放入内存，不会丢失，下一次从内存读取16kb
// write end 异步方法
const flag1 = ws.write('+1', () => {
  console.log('写入+1')
});
// console.log({flag1})
const flag2 = ws.write('+1', () => {
  console.log('写入+1')
}); // 必须字符串或buffer类型
// console.log({flag2});
ws.write('+1'); // 必须字符串或buffer类型
// ws.end('end'); // 结束 把所有内容强制写入
// ws.write('+1'); // 结束后不能调用write

// 可以继续写入数据流触发
ws.on('drain', () => {
  console.log('drain');
})
// 返回值 flag 如果false 
