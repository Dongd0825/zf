// 可读流 可写流
// 一边读，一边写
import fs from 'fs';

// 创建可读流
const rs = fs.createReadStream('./EventEmitter.js');
const buffer = [];
rs.on('data', (chunk) => {
  // str += chunk; // 不靠谱 读取大小不固定时
  buffer.push(chunk);
  rs.pause(); // 暂停data事件
  console.log(chunk);
});
setTimeout(() => {
  rs.resume();// 恢复data事件
}, 1000);
rs.on('end', () => {
  console.log('end', Buffer.concat(buffer).toString());
});