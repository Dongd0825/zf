// 30b 读取4b 5次
import fs from 'fs';

function pipe(source, target) {
  const rs = fs.createReadStream(source, {
    highWaterMark: 4
  });
  const ws = fs.createWriteStream(target, {
    highWaterMark: 1
  });
  // rs.pipe(ws);// 可读流写入可写流 等同于下面内容，不用分段读取
  // 可读取
  rs.on('data', chunk => {
    // 共调用8次 4*8=32>30
    if (ws.write(chunk) === false) {
      rs.pause();
    }
  });
  ws.on('drain', () => {
    rs.resume();
  });
  rs.on('end', () => {
    // 当读取完毕 强制将内存读取到文件
    ws.end();
  });
}
pipe('1.txt', '2.txt');