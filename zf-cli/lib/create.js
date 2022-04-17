// 创建项目
const path = require('path');
const fs = require('fs-extra');
const Inquirer = require('inquirer');
const Creator = require('./Creator');

// 如果有重名目录重复创建，如何处理？
module.exports = async function(projectName, options) {
  const cwd = process.cwd(); // 执行命令的目录
  const targetDir = path.join(cwd, projectName); // 目标目录

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      // 提示用户是否存在
      let { action } = await Inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists, Please pick an action',
          choices: [
            {name: 'Overwrite', value: 'overwrite'},
            {name: 'Cancel', value: false},
          ],
        }
      ])
      if (!action) {
        return 
      } else if (action === 'overwrite') {
        fs.remove(targetDir);
      }
    }
  }
  const creator = new Creator(projectName, targetDir);
  creator.create();
}