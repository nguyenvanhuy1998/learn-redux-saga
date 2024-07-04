import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/common';
import { AdminLayout } from 'components/layout';
import { authActions } from 'features/auth/authSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => dispatch(authActions.logout())}>
        Logout
      </Button>
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
