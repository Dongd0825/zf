import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import history from './core/history';
import {getRoutes} from './core/routes';

let routes = getRoutes();
ReactDom.render(
  <Router history={history}>
    {renderRoutes(routes)}
  </Router>,
  document.getElementById('root')
)
console.log('rotes', renderRoutes(routes));

function renderRoutes(routes) {
  return routes.map(({path, exact, component: RouteComponent, routes: childrenRoutes = []}) => {
    return (
      <Route
        key={path}
        path={path}
        exact={exact}
        render={
          routeProps => {
            return (
              <RouteComponent {...routeProps}>
                <Switch>
                  {renderRoutes(childrenRoutes)}
                </Switch>
              </RouteComponent>
            )
          }
        }
      >
      </Route>
    )
  })
}
/**
 * route
 *  渲染组件的三种方式
 * render component children
 */



