import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1651577413418_1797';

  // add your egg config in here
  config.middleware = [];

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'admin123',
      database: 'cms2'
    },
    app: true, // egg 应用，或者app上多个属性，app。mysql
    agent: false, // 
  }

  // exports.passportLocal = {
  //   usernameField: 'userName',
  //   // passwordField: 'password',
  // };

  config.security = {
    csrf: {
      enable: false
    }
  }

  // 自定义日志
  config.customLogger = {
    passportLogger: {
      file: 'passportLogger.log',
    },
    authLogger: {
      file: 'authLogger.log',
    },
  };


  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
