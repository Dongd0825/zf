import minimist from 'minimist';
import chalk  from 'chalk';
import ProgressBar from 'progress';
import ReadLine from 'readline';
import inquirer from 'inquirer';

// 参数
// const args = process.argv.slice(2);
// console.log(minimist(args));

// time
// console.time('timeStr');
// let count = 10000;
// while(count) {
//   count--;
// }
// console.timeEnd('timeStr');

// 带颜色输出
// console.log('\x1b[33m%s\x1b[0m', '你好');
// console.log(chalk.red.bold.bgWhite('Hello World'));

// 导航条
// const bar = new ProgressBar(':bar', { total: 10 });
// const timer = setInterval(() => {
//   bar.tick()
//   if (bar.complete) {
//     clearInterval(timer)
//   }
// }, 100)

// 自定义指令
// const readline = ReadLine.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// readline.question('what`s your name?', name => {
//   console.log(`hello`, name);
//   readline.close();
// })

var questions = [
  {
    type: 'input',
    name: 'name',
    message: "你叫什么名字?"
  }
]

inquirer.prompt(questions).then(answers => {
  console.log(`你好 ${answers['name']}!`)
})