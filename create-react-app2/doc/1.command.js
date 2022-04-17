 const chalk = require('chalk');
 const {Command} = require('commander');

console.log('process.argv', process.argv);
let program = new Command('create-react-app');

program
  .version('1.0.0')
  .arguments('<must1> <must2> [option1] [option2]')
  .usage(`${chalk.cyan('<must1> <must2> [option1] [option2]')}`)
  .action((m1, m2, o1, o2) => {
    console.log('m1 m2 o1 o2', m1, m2, o1, o2);
    
  })
  .parse(process.argv);
