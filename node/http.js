// ip地址 域名 
// 127.0.0.1 localhost
// 23.34.5.3 baidu
// dns解析
// 第一次访问，缓存ip
import http from 'http';

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.write('你好');
  res.end('hello');
}).listen('80', () => {
  console.log('80端口已监听');
})