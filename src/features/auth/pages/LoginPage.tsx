import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectLogging } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(3),
  },
  button: {
    marginTop: '32px',
  },
}));

export default function LoginPage() {
  const classes = useStyles(useTheme());
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectLogging);
  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      }),
    );
  };
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5">Student Management</Typography>
        <Box className={classes.button}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={18} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
