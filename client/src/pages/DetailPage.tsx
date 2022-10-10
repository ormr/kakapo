import React, { FC, ReactElement, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { requestGetPostById } from '../features/posts/actions';

const DetailPage: FC = (): ReactElement => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const id = location.pathname.slice(7);

  useEffect(() => {
    dispatch(requestGetPostById(id));
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Детальная страница</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailPage;
