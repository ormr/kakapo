import React, { FC, ReactElement, useState } from 'react';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

const CreatePage: FC = (): ReactElement => {
  const [value, setValue] = useState<string>('');
  const handleChange = (e: string | undefined) => {
    setValue(`${e}`);
  };

  return (
    <Container>
      <Grid spacing={4} container mt={4} mb={4}>
        <Grid item xs={12}>
          <Typography variant="h4">Создать статью</Typography>
        </Grid>
        <Grid item xs={12}>
          <form>
            <Box mb={4}>
              <MDEditor
                value={value}
                onChange={(newValue) => handleChange(newValue)}
              />
            </Box>
            <Box>
              <Button variant="contained">Отправить</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatePage;
