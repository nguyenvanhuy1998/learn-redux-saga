import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { StudentTable } from '../components/StudentTable';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));
export function ListPage() {
  const classes = useStyles();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const loading = useAppSelector(selectStudentLoading);
  const filter = useAppSelector(selectStudentFilter);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);
  const handleChangePage = (event: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      }),
    );
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>
      {/* Student Table */}
      <StudentTable studentList={studentList} />

      {/* Pagination */}
      <Box className={classes.paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}
