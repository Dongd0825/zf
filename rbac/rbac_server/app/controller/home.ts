import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, app } = this;
    let users = await app.mysql.select('User');
    ctx.body = {
      success: true,
      data: users
    };
  }
}
