import { Button, Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import Footer from 'src/components/Footer';

const office = () => {
  const user = {
    name: 'Akash Chhangani'
  };
  return (
    <>
      <Helmet>
        <title>Office</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Office
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are the list of the Offices
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ margin: '0.6rem' }}
              // onClick={handleClickOpen}
            >
              <AddTwoToneIcon
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '5px'
                }}
              />{' '}
              Create Offices
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Container>
        <DataNotFound />
      </Container>
      <Footer />
    </>
  );
};

export default office;
