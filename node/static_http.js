// ip地址 域名 
// 127.0.0.1 localhost
// 23.34.5.3 baidu
// dns解析
// 第一次访问，缓存ip
import http from 'http';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

// let mine = {
//   'js': 'application/javascript',
//   'html': 'text/html;charset=utf-8',
//   'css': 'text/html;charset=utf-8',
// }

http.createServer((req, res) => {
  const urlObj = new URL('http://localhost/' + req.url + '?a=bs');
  const pathname = urlObj.pathname.slice(1);
  fs.stat('./' + pathname, (err, stats) => {
    let suffix = pathname.match(/\.(\w+)/)?.[1];
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
    } else if (stats.isFile()) {
      res.setHeader('Content-Type', mine.getType(suffix));
      fs.createReadStream(path.join('./', urlObj.pathname)).pipe(res);
    } else if (stats.isDirectory()) { // ./ 是文件夹
      res.setHeader('Content-Type', mime.getType('html'));
      fs.createReadStream(path.join('./', urlObj.pathname, 'index.html')).pipe(res);
    }
  })
}).listen('80', () => {
  console.log('80端口已监听');
})