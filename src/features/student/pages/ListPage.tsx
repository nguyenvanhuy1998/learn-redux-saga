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
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { StudentFilter } from '../components/StudentFilter';
import { ListParams, Student } from 'models';
import studentApi from 'api/studentApi';

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
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
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
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };
  const handleRemoveStudent = async (student: Student) => {
    try {
      // Remove student API
      await studentApi.remove(student.id || '');
      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log('Failed to remove student: ' + error);
    }
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
      {/* Student Filter */}
      <Box
        style={{
          marginBottom: '24px',
        }}
      >
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>
      {/* Student Table */}
      <StudentTable studentList={studentList} cityMap={cityMap} onRemove={handleRemoveStudent} />

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
