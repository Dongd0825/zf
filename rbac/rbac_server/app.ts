// app.ts
import { Application, IBoot } from 'egg';
import { Strategy } from 'passport-local';

export default class FooBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  configDidLoad() {
    let { app } = this;
    app.passport.use(new Strategy({
      usernameField: 'userName', // 从请求体里的哪个字段获取用户名
      passReqToCallback: true // 向callback中传递request对象
    }, async (request, userName, password, done) => {
      // SELECT * from user WHERRE userName = ? AND password = ? limit 1
      // @ts-ignore
      let user = await app.mysql.get('User', {userName, password});
      if (user) {
        // @ts-ignore
        let role = await app.mysql.query(`SELECT role.* FROM role_user INNER JOIN role ON role_user.role_id = role.id WHERE role_user.role_id = ${user!.id}`);
        // @ts-ignore
        user.role = role;
        done(null, user);
      } else {
        // 如果登陆失败，则需求清除原来的登陆状态
        request.ctx.logout();
        done(null, false);
      }
    }))
  }
}