import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/layout';
import { NotFound, PrivateRoute } from 'components/common';
import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Button variant="contained" color="primary" onClick={() => dispatch(authActions.logout())}>
        Logout
      </Button>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
