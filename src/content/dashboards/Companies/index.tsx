import { SetStateAction, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
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
  Container,
  IconButton
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataNotFound from 'src/content/pages/Status/DataNotFound';

const company = () => {
  const [open, setOpen] = useState(false);
  const [submitClientData, setSubmitClientData] = useState([]);
  const [editingClientTable, setEditingClientTable] = useState(null);
  const [editIconColor, setEditIconColor] = useState('green');
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

  const handleEditTable = (
    formData: SetStateAction<{
      companyName: string;
      address: string;
      officeId: string;
      email: string;
      phoneNo: string;
      city: string;
      state: string;
      country: string;
    }>
  ) => {
    setFormData(formData);
    setOpen(true);
    setEditingClientTable(formData);

    const editedIndex = submitClientData.findIndex((item) => item === formData);
    if (editedIndex !== -1) {
      setEditIconColor('black');
    } else {
      setEditIconColor('green');
    }
  };

  const handleSaveEdit = () => {
    const emptyFields = Object.values(formData).filter(
      (value) => value.trim() === ''
    );
    if (emptyFields.length > 0) {
      alert('Please fill in all fields.');
    } else {
      const newData = { ...formData };
      const editingIndex = submitClientData.findIndex(
        (item) => item === editingClientTable
      );
      const updatedSubmitData = [...submitClientData];
      updatedSubmitData[editingIndex] = newData;
      setSubmitClientData(updatedSubmitData);
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
      localStorage.setItem(
        'submitClientData',
        JSON.stringify(updatedSubmitData)
      );
      setOpen(false);
      setEditIconColor('black');
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('submitClientData');
    if (storedData) {
      setSubmitClientData(JSON.parse(storedData));
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setEditingClientTable(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setOpen(false);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete = (index: number) => {
    const newData = submitClientData.filter((_, i) => i !== index);
    setSubmitClientData(newData);
    localStorage.setItem('submitClientData', JSON.stringify(newData));
  };

  const handleSubmit = () => {
    const emptyFields = Object.values(formData).filter(
      (value) => value.trim() === ''
    );
    if (emptyFields.length > 0) {
      alert('Please fill in all fields.');
    } else {
      const newData = { ...formData };
      setSubmitClientData((prevData) => [...prevData, newData]);
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
      localStorage.setItem(
        'submitClientData',
        JSON.stringify([...submitClientData, newData])
      );
    }
  };

  const user = {
    name: 'Catherine Pike'
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
            />
            {editingClientTable ? 'Edit Company' : ' Create Company'}
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '0 !important' // Hide scrollbar on Chrome, Safari, and Opera
            },
            '-ms-overflow-style': 'none', // Hide scrollbar on IE and Edge
            'scrollbar-width': 'none' // Hide scrollbar on Firefox
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  sx={{ marginTop: '1rem' }}
                  id="companyName"
                  name="companyName"
                  label="Company Name"
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="officeId"
                  name="officeId"
                  label="Office Id"
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.officeId}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="phoneNo"
                  name="phoneNo"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="city"
                  name="city"
                  label="City "
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="state"
                  name="state"
                  label="State"
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="country"
                  name="country"
                  label="Country"
                  variant="outlined"
                  required
                  fullWidth
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="success"
            sx={{ margin: '0.6rem' }}
            onClick={() => {
              if (editingClientTable) {
                handleSaveEdit();
              } else {
                handleSubmit();
              }
              handleClose();
            }}
          >
            {editingClientTable ? 'Save' : 'Submit'}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={editingClientTable ? handleCancelEdit : handleClose}
          >
            {editingClientTable ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {submitClientData.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <TableContainer component={Paper}>
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
                    {submitClientData.map((formData, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          {formData.companyName}
                        </TableCell>
                        <TableCell align="center">{formData.address}</TableCell>
                        <TableCell align="center">
                          {formData.officeId}
                        </TableCell>
                        <TableCell align="center">{formData.email}</TableCell>
                        <TableCell align="center">{formData.phoneNo}</TableCell>
                        <TableCell align="center">{formData.city}</TableCell>
                        <TableCell align="center">{formData.state}</TableCell>
                        <TableCell align="center">{formData.country}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleDelete(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEditTable(formData)}>
                            <EditIcon sx={{ color: editIconColor }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        ) : (
          <DataNotFound />
        )}
      </Container>

      <Footer />
    </>
  );
};

export default company;
