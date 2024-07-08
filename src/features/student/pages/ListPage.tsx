import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import { studentActions } from '../studentSlice';

export function ListPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 15,
      }),
    );
  }, [dispatch]);
  return <div>ListPage</div>;
}
