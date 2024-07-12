import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { City, Student } from 'models';
import { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));
export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export function StudentTable({ studentList, onEdit, onRemove, cityMap }: StudentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveConfirm = () => {
    onRemove?.(selectedStudent as Student);
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box
                    style={{
                      color: getMarkColor(student.mark),
                      fontWeight: 'bold',
                    }}
                  >
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.edit}
                    color="primary"
                    onClick={() => onEdit?.(student)}
                  >
                    Edit
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(student)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}". <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="default" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={handleRemoveConfirm} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
