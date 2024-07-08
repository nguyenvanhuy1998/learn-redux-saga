import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ListPage } from './pages/ListPage';
import { AddEditPage } from './pages/AddEditPage';

export function StudentsFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>
      <Route path={`${match.path}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
