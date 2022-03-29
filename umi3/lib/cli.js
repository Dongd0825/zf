let Service = require('./Service');
let dev = require('../plugins/commands/dev');
let history = require('../plugins/generateFiles/history');
let umi = require('../plugins/generateFiles/umi');
let routes = require('../plugins/generateFiles/routes');

(async () => {
  let service = new Service({
    plugins: [
      {id: 'dev', apply: dev},
      {id: 'history', apply: history},
      {id: 'umi', apply: umi},
      {id: 'routes', apply: routes}
    ]
  });
  // 运行dev命令
  await service.run({name: 'dev'});
})()