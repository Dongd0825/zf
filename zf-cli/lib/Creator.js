const { fetchRepoList, fetchTagList } = require('./request');
const Inquirer = require('inquirer');
const { wrapLoading } = require('./util');
const downloadGitRepo = require('download-git-repo');
const util = require('util');
const path = require('path');

class Creator {
  constructor(projectName, targetDir) {
    this.projectName = projectName;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async fetchRepo() {
    let repos = await wrapLoading(fetchRepoList, 'waiting fetch template');
    if (!repos) return;

    repos = repos.map(_=> _.name);
    let { repo } = await Inquirer.prompt({
      name: 'repo',
      type: 'list',
      message: 'please choice a vue template to create project',
      choices: repos,
    })
    return repo;
  }
  async fetchTags(repo) {
    let tags = await wrapLoading(fetchTagList, 'waiting fetch template', repo);
    if (!tags) return;

    tags = tags.map(_=> _.name);
    let { tag } = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      message: 'please choice a tag to create project',
      choices: tags,
    })
    return tag;

  }
  async download(repo, tag) {
    // 拼接路径 并下载
    // zhu-cli/vue-template#1.0
    let requestUrl = `zhu-cli/${repo}${tag?'#'+tag: ''}`;
    // 静态资源下载到目标目录
    // 增加缓存功能
    // 应该下载到系统目录中，用ejs handlebar 去渲染模版 最后生成结果 再写入
    // 家 loading
    // 判断如果有则提示 // pacagejson. 替换模版
    // 放到系统文件 =》 模版 和用户其他选择 =》 生成结果 放到当前目录下
    await this.downloadGitRepo(requestUrl, path.resolve(process.cwd(), `${repo}@${tag}`));
    return this.targetDir;
  }
  async create() {
    // 拉去当前组织下的模版 下载模版 供用户选择模版 并返回选择模版
    const repoName = await this.fetchRepo();
    const tagName = await this.fetchTags(repoName);
    await this.download(repoName, tagName);
  }
}

module.exports = Creator;