#! usr/bin/env node
console.log('sss')

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const spawn = require('cross-spawn');
const args = process.argv.slice(2);
const script = args[0];

spawn.sync(
  process.execPath, // node  可执行文件路径
  [require.resolve('../scripts/'+script)],
  {stdio:"inherit"} // 与父进程共享输入输出
)

