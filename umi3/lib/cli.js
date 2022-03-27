let Service = require('./Service');
let dev = require('../plugins/commands/dev');
let history = require('../plugins/generateFiles/history');

(async () => {
  let service = new Service({
    plugins: [
      {id: 'dev', apply: dev},
      {id: 'history', apply: history}
    ]
  });
  // 运行dev命令
  await service.run({name: 'dev'});
})()