import { Application } from 'egg';

export default async (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  // 参数指鉴权的方法
  const localStrategy = app.passport.authenticate('local', {
    // 不管成功和失败，鉴权都会重定向到apilogincallback
    successRedirect: '/api/loginCallback',
    failureRedirect: '/api/loginCallback',
  })
  // localStorategy功能先从请求中获取到用户密码，然后把它们传入我们自己写的callback
  // 鉴权成功后会把用户传给done，done里会把用户放入session会话，并重定向到/api/loginCallback
  router.post('/api/login/account', localStrategy);
  router.get('/api/loginCallback', controller.user.userLogin);

  const auth = app.middleware.auth();
  router.post('/api/user/add', auth, controller.user.addUser);
  router.get('/logout', controller.user.logout);
  router.get('/api/currentUser', controller.user.currentUser);
};
