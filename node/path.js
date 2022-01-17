// path 与 resolve 区别
import path from 'path';


// resovle 解析出绝对路径
console.log(path.resolve('./1.txt'));

// join 拼接路径
console.log(path.join('./a', './b'));

// 根据特殊字符，解析mac还是window
//path.delimiter
console.log(path.delimiter);

console.log(path.sep)