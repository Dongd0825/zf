const { Command } = require('commander');
const packageJson = require('./package.json');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const spawn = require('cross-spawn');

async function init () {
  let projectName;
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
      projectName = name;
      console.log('projectName',projectName)
    })
    .parse(process.argv);

  await createApp(projectName);
}
async function createApp(name) {
  const root = path.resolve(name);
  const appName = path.basename(root);
  console.log(root, appName);
  fs.ensureDirSync(name); // 判断是否存在，如果不存在则创建

  console.log();
  console.log(`Creating a new React app in ${chalk.green(root)}.`);
  console.log();

  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  const originalDirectory = process.cwd();
  process.chdir(root);
  console.log('root',root)
  console.log('originalDirectory',originalDirectory)
  await run(root, appName, originalDirectory)
}

async function run(root, appName, originalDirectory) {
  let scriptName = 'react-scripts';
  let templateName = 'cra-template';
  const allDependencies = ['react', 'react-dom', scriptName, templateName];
  console.log('Installing packages. This might take a couple of minutes.');
  console.log(
    `Installing ${chalk.cyan('react')}, ${chalk.cyan(
      'react-dom'
    )}, and ${chalk.cyan(scriptName)}${ ` with ${chalk.cyan(templateName)}` 
    }...`
  );
  console.log();
  await install(root, allDependencies);
  //
  let data = [
    root,  // 项目根目录
    appName, //项目的名字
    true, // verbose是否显示详细信息
    originalDirectory, //原始目录
    templateName, // 模版名称
  ]
  let source = `
    const init = require('${scriptName}/scripts/init.js');
    init.apply(null, JSON.parse(process.argv[1]));
  `
  await executeNodeScript({
    cwd: process.cwd(),
  },data, source);
}

async function executeNodeScript({cwd}, data, source) {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath, // node可执行文件的路径
      [ '-e', source, '--', JSON.stringify(data)],
      {cwd, stdio: 'inherit'}
    )
    child.on('close', () => {
      resolve();
    })
  })
}

function install(root, allDependencies) {
  return new Promise((resolve, reject) => {
    let command = 'yarnpkg';
    const args = ['add', '--exact', ...allDependencies, '--cwd', root];
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      resolve();
    })
  })
}

module.exports = {
  init
}