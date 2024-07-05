import { NotFound, PrivateRoute } from 'components/common';
import { AdminLayout } from 'components/layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <PrivateRoute path={'/admin'}>
          <AdminLayout />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
