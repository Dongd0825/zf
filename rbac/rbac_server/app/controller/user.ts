import { Controller } from 'egg';
// import * as jtw from 'jsonwebtoken';

export default class UserController extends Controller {
  public async userLogin() {
    const { ctx } = this;
    
    if (ctx.isAuthenticated()) {
      // let data = {
      //   status: 'ok',
      //   type: 'account',
      //   currentAuthority: ctx.user.role[0].name
      // }
      // const sign = jtw.sign(data, 'secret');
      // ctx.body = {
      //   success: true,
      //   data: sign
      // }
      ctx.body = {
        status: 'ok',
        type: 'account',
        currentAuthority: ctx.user.role[0].name
      }
    } else {
      ctx.body = {
        success: false,
        error: '用户登陆失败'
      }
    }
  }
  async logout() {
    const ctx = this.ctx;

    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }

  async currentUser() {
    const { ctx } = this;
    ctx.body = {
      data: {
        ...ctx.user, // 如果用户成功了，就会把用户信息赋值给ctx.user
        access: 'admin'
      }
    }
  }

  async addUser() {
    const { ctx } = this;
    ctx.body = {
      success: true,
      status: '添加成功'
    }
  }
}
