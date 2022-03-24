// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/didong/Desktop/Code/react/zf/umi3/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.js').default
  },
  {
    "path": "/User",
    "routes": [
      {
        "path": "/User/add",
        "exact": true,
        "component": require('@/pages/User/add.js').default
      },
      {
        "path": "/User/list",
        "exact": true,
        "component": require('@/pages/User/list.js').default
      }
    ],
    "component": require('@/pages/User/_layout.js').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
