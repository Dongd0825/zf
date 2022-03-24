export function getRoutes() {
  const routes = [
    {
      "path": "/",
      "exact": true,
      "component": require('@/pages/index.js').default
    },
    {
      "path": "/profile",
      "exact": true,
      "component": require('@/pages/profile/index.js').default
    },
    {
      "path": "/user",
      "routes": [
        {
          "path": "/user/add",
          "exact": true,
          "component": require('@/pages/user/add.js').default
        },
        {
          "path": "/user/list",
          "exact": true,
          "component": require('@/pages/user/list.js').default
        }
      ],
      "component": require('@/pages/user/_layout.js').default
    }
  ];
  return routes;
}