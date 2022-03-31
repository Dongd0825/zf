export function patchRoutes({ routes }) {
  console.log('routes',routes)
  routes.unshift({
    path: '/foo',
    exact: true,
    component: require('@/foo').default,
  });
}