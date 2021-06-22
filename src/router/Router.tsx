import { memo, VFC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { DashboardRouter } from './DashboardRouter';
import { DetailAsset } from '../components/pages/DetailAsset';
import { RegistAsset } from '../components/pages/RegistAsset';
import { Account } from '../components/pages/Account';
import { Page404 } from '../components/pages/Page404';
import { HeaderLayout } from '../components/templetes/HeaderLayout';

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard/" />
      </Route>
      <Route
        path="/dashboard/"
        render={({ match: { url } }) => (
          <Switch>
            {DashboardRouter.map((route) => (
              <Route key={route.path} exact={route.exact} path={`${url}${route.path}`}>
                <HeaderLayout>{route.children}</HeaderLayout>
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route exact path="/asset/:code">
        <HeaderLayout>{<DetailAsset />}</HeaderLayout>
      </Route>
      <Route exact path="/regist_asset/">
        <HeaderLayout>{<RegistAsset />}</HeaderLayout>
      </Route>
      <Route exact path="/account/">
        <HeaderLayout>{<Account />}</HeaderLayout>
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
