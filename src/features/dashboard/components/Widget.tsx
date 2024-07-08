import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
  childrenWidget: {
    marginTop: theme.spacing(2),
  },
}));
export interface WidgetProps {
  title: string;
  children: any;
}

export function Widget({ title, children }: WidgetProps) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="button">{title}</Typography>
      <Box className={classes.childrenWidget}>{children}</Box>
    </Paper>
  );
}
