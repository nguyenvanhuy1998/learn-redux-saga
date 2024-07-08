import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { ChatBubble, ChatRounded, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { StatisticItem } from './components/StatisticItem';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistic,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';

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
}));
export function Dashboard() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistic);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);
  console.log({
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCityList,
  });
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
