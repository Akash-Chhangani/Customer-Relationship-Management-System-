import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Container
} from '@mui/material';
import './Crypto/client.css';
import BusinessIcon from '@mui/icons-material/Business';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import DataNotFound from './Crypto/dataNotFound.jpg';

export default function client() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('submittedData');
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    officeId: '',
    email: '',
    phoneNo: '',
    city: '',
    state: '',
    country: ''
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete = (index) => {
    const newData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(newData);
    localStorage.setItem('submittedData', JSON.stringify(newData));
  };

  const handleSubmit = () => {
    // Check if any field is empty
    const emptyFields = Object.values(formData).filter(
      (value) => value.trim() === ''
    );
    if (emptyFields.length > 0) {
      alert('Please fill in all fields.');
    } else {
      const newData = { ...formData };
      // Update submittedData state
      setSubmittedData((prevData) => [...prevData, newData]);
      // Reset form data
      setFormData({
        companyName: '',
        address: '',
        officeId: '',
        email: '',
        phoneNo: '',
        city: '',
        state: '',
        country: ''
      });

      // Save submittedData to local storage
      localStorage.setItem(
        'submittedData',
        JSON.stringify([...submittedData, newData])
      );
    }
  };

  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <>
      <Helmet>
        <title>Companies</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Companies
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are the list of the companies
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ margin: '0.6rem' }}
              onClick={handleClickOpen}
            >
              <AddTwoToneIcon
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '5px'
                }}
              />{' '}
              Create Company
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            sx={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '24px'
            }}
          >
            <BusinessIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />{' '}
            Create Company
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Card
              sx={{
                margin: '1rem',
                padding: '1rem',
                borderRadius: '2rem'
              }}
            >
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={18}>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '13rem' }
                    }}
                    // noValidate
                    // autoComplete="off"
                  >
                    <TextField
                      id="companyName"
                      name="companyName"
                      label="Company Name"
                      variant="outlined"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="address"
                      name="address"
                      label="Address"
                      variant="outlined"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                    />

                    <TextField
                      id="officeId"
                      name="officeId"
                      label="Office Id"
                      variant="outlined"
                      required
                      value={formData.officeId}
                      onChange={handleInputChange}
                    />

                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />

                    <TextField
                      id="phoneNo"
                      name="phoneNo"
                      label="Phone Number"
                      variant="outlined"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                    />

                    <TextField
                      id="city"
                      name="city"
                      label="City "
                      variant="outlined"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="state"
                      name="state"
                      label="State"
                      variant="outlined"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                    />

                    <TextField
                      id="country"
                      name="country"
                      label="Country"
                      variant="outlined"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="success"
            sx={{ margin: '0.6rem' }}
            onClick={handleSubmit}
          >
            {' Submit'}
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ margin: '1rem' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {submittedData.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ margTop: '2rem' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Company Name</TableCell>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">Office ID</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Phone Number</TableCell>
                      <TableCell align="center">City</TableCell>
                      <TableCell align="center">State</TableCell>
                      <TableCell align="center">Country</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {submittedData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{data.companyName}</TableCell>
                        <TableCell align="center">{data.address}</TableCell>
                        <TableCell align="center">{data.officeId}</TableCell>
                        <TableCell align="center">{data.email}</TableCell>
                        <TableCell align="center">{data.phoneNo}</TableCell>
                        <TableCell align="center">{data.city}</TableCell>
                        <TableCell align="center">{data.state}</TableCell>
                        <TableCell align="center">{data.country}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h5" align="center" sx={{ marginTop: '2rem' }}>
            <div>
              <img
                style={{
                  width: '70vh',
                  height: '60vh',
                  opacity: '0.5',
                  borderRadius: '2rem'
                }}
                src={DataNotFound}
                alt="dataNotFound"
              />
            </div>
            No data found!
          </Typography>
        )}
      </Container>

      <Footer />
    </>
  );
}
