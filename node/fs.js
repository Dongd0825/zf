import e from 'express';
import fs from 'fs';
// fs.writeFile('./zf.txt', JSON.stringify({a:'sssa'}), (err) => {
//   err && console.log('err',err)
// });

// fs.writeFileSync('./zf.txt', JSON.stringify({a:'dddd'}));

/**
 * 异步copy
 */
function copy(source, target, callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(source, (err, data) => {
      if (err) reject(err);
      fs.writeFile(target, data, (err) => {
        if (err) reject(err);
        resolve(true);
      })
    })
  })
}
function copy1(source, target, callback) {
    fs.readFile(source, (err, data) => {
      if (err) reject(err);
      fs.writeFile(target, data, callback)
    })
}

/**
 * 同步copy
 */
function copySync(source, target) {
  const data = fs.readFileSync(source);
  console.log(data,typeof data);
  fs.writeFileSync(target, data);
  return true;
}

// copySync('./1.txt', './2.txt');
// copy1('./1.txt', './2.txt',(err)=> {
//   console.log({err})
// });

// appendFile option flag：‘a’

fs.stat('./1.txt', (err, stats) => {
  if (err) {
    console.log('文件不存在');
  }
  console.log(stats.isFile());// 判断是不是文件
  console.log(stats.isDirectory());// 判断是不是文件夹
  // atime access time
  // ctime change time
  // mtime modify time
  // birthtime
})

// 存在a时候，才能创建b
// fs.mkdir('a/b', (err) => {
//   console.log(err);
// });

// mkdir -p a1/b1/c1 

// 递归创建目录
function makeP(path, callback) {
  const pathArr = path.split('/');
  let index = 0;
  // 递归创建目录
  function make(p) {
    if (index > pathArr.length) return;
    fs.stat(p, (err) => {
      if (err) { // 目录不存在，则会报错
        fs.mkdir(p, (err) => {
          if (err) return err;
          make(pathArr.slice(0, ++index).join('/'), callback);
        })
      } else { // 存在则创建下一个目录
        make(pathArr.slice(0, ++index).join('/'), callback);
      }
    })
  }
  make(pathArr[0]);
}

makeP('a1/b1/c1', (err) => {
  err && console.log('递归创建目录失败',err)
})