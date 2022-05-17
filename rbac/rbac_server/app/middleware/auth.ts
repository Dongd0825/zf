module.exports = (_options, _app) => {
  return async function (ctx, next) {
    if (ctx.isAuthenticated()) {
      let user = ctx.user;
      let url = ctx.url;
      let permissions = await ctx.app.mysql.query(`
        SELECT permission.KEY FROM role_user INNER JOIN role_permission ON role_user.role_id = role_permission.role_id 
        INNER JOIN permission on permission.id = role_permission.permission_id
        WHERE role_user.user_id = ${user.id};
      `);

      ctx.app.getLogger('authLogger').info(`permissions ${permissions} user_id: ${ctx.user.id}`);
      
      // @ts-ignore
      let allowd = permissions.map((_) => _.KEY).includes(url);
      if (allowd) {
        await next()
      } else {
        ctx.status = 403;
        ctx.body = {
          success: false,
          error: '无权限'
        }
      }
    } else {
      ctx.status = 403;
      ctx.body = {
        success: false,
        error: '无权限'
      }
    }
  }
}