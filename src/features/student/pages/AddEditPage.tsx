import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student>();
  const isEdit = Boolean(studentId);
  useEffect(() => {
    if (!studentId) return;
    // Do something here
    // IFFE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);
  console.log({ student });
  return (
    <Box>
      <Link to={'/admin/students'}>
        <Typography
          variant="caption"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>
    </Box>
  );
}
