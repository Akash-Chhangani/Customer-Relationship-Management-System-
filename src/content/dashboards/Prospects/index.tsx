import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from 'src/components/Footer';
import EditIcon from '@mui/icons-material/Edit';
import DataNotFound from 'src/content/pages/Status/DataNotFound';

const Prospects = () => {
  const [open, setOpen] = useState(false);
  const [submitData, setSubmitData] = useState([]);
  const [editingTable, setEditingTable] = useState(null);
  const [editIconColor, setEditIconColor] = useState('green');
  const [data, setData] = useState({
    name: '',
    email: '',
    officeId: '',
    companyId: '',
    phoneNo: '',
    status: ''
  });

  const handleEditTable = (
    data: React.SetStateAction<{
      name: string;
      email: string;
      officeId: string;
      companyId: string;
      phoneNo: string;
      status: string;
    }>
  ) => {
    setData(data); // Set the data of the prospect to edit in the form fields
    setOpen(true);
    setEditingTable(data); // Set the editingTable to the data being edited

    // Check if the data being edited has been previously saved
    const editedIndex = submitData.findIndex((item) => item === data);
    if (editedIndex !== 1) {
      setEditIconColor('black'); // Set the color of the edit icon to black
    } else {
      setEditIconColor('green'); // Set the color of the edit icon to green
    }
  };

  useEffect(() => {
    // Load data from local storage when component mounts
    const storedData = localStorage.getItem('submitData');
    if (storedData) {
      setSubmitData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = () => {
    // Check if any field is empty
    const emptyFields = Object.values(data).filter(
      (value) => value.trim() === ''
    );
    if (emptyFields.length > 0) {
      alert('Please fill in all fields.');
    } else {
      const newData = { ...data };
      // Update submitData state
      setSubmitData((prevData) => [...prevData, newData]);
      // Reset form data
      setData({
        name: '',
        email: '',
        officeId: '',
        companyId: '',
        phoneNo: '',
        status: ''
      });

      // Save submitData to local storage
      localStorage.setItem(
        'submitData',
        JSON.stringify([...submitData, newData])
      );
    }
  };

  const handleDelete = (index: number) => {
    const newData = submitData.filter((_, i) => i !== index);
    setSubmitData(newData);
    localStorage.setItem('submitData', JSON.stringify(newData));
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditingTable(null); // Reset editingNote when opening the modal for creating a new Table
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setOpen(false);
  };

  const handleSaveEdit = () => {
    // Check if any field is empty
    const emptyFields = Object.values(data).filter(
      (value) => value.trim() === ''
    );
    if (emptyFields.length > 0) {
      alert('Please fill in all fields.');
    } else {
      const newData = { ...data };
      // Find the index of the editingTable in submitData
      const editingIndex = submitData.findIndex(
        (item) => item === editingTable
      );
      // Replace the previous data with the edited data
      const updatedSubmitData = [...submitData];
      updatedSubmitData[editingIndex] = newData;
      // Update submitData state
      setSubmitData(updatedSubmitData);
      // Reset form data
      setData({
        name: '',
        email: '',
        officeId: '',
        companyId: '',
        phoneNo: '',
        status: ''
      });
      // Save submitData to local storage
      localStorage.setItem('submitData', JSON.stringify(updatedSubmitData));
      // Close the dialog
      setOpen(false);

      // Set the color of the edit icon to black after saving the edit
      setEditIconColor('black');
    }
  };

  const user = {
    name: 'Catherine Pike'
  };
  return (
    <>
      {/* For Change the title on web page */}
      <Helmet>
        <title>Notes</title>
      </Helmet>

      {/* For display the main contain of the page  */}
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Prospects
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are the list of the Prospects
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
              Create Prospect
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      {/* When creating new notes this appears */}
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
            <AccountCircleIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />{' '}
            {editingTable ? 'Edit Prospect' : 'Create Prospect'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  sx={{ marginTop: '1rem' }}
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={data.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={data.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="officeId"
                  name="officeId"
                  label="Office Id"
                  variant="outlined"
                  value={data.officeId}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="companyId"
                  name="companyId"
                  label="Company Id"
                  variant="outlined"
                  value={data.companyId}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phoneNumber"
                  name="phoneNo"
                  label="Phone Number"
                  variant="outlined"
                  value={data.phoneNo}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*' // Only allows numbers
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="status-basic"
                  name="status"
                  label="Status"
                  variant="outlined"
                  value={data.status}
                  onChange={handleInputChange}
                  fullWidth
                  required
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
              if (editingTable) {
                handleSaveEdit();
              } else {
                handleSubmit();
              }
              handleClose(); // Close the dialog after saving
            }}
          >
            {data.name ? 'Save' : 'Submit'}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={editingTable ? handleCancelEdit : handleClose}
          >
            {editingTable ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {submitData.length > 0 ? (
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
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Office ID</TableCell>
                      <TableCell align="center">Company ID</TableCell>
                      <TableCell align="center">Phone Number</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {submitData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{data.name}</TableCell>
                        <TableCell align="center">{data.email}</TableCell>
                        <TableCell align="center">{data.officeId}</TableCell>
                        <TableCell align="center">{data.companyId}</TableCell>
                        <TableCell align="center">{data.phoneNo}</TableCell>
                        <TableCell align="center">{data.status}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleDelete(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEditTable(data)}>
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

export default Prospects;
