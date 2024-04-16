import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Helmet } from 'react-helmet-async';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Footer from 'src/components/Footer';
import DataNotFound from 'src/content/pages/Status/DataNotFound';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

const location = () => {
  const [country, setCountry] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Retrieve locations data from local storage when component mounts
    const storedNotes = localStorage.getItem('locations');
    if (storedNotes) {
      setLocations(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    // Fetch list of countries from an API
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        // Extract country names from the fetched data
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    // Save locations data to local storage whenever it changes
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

  const handleCreateLocation = () => {
    if (country.trim() === '' || locationDescription.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    const newLocation = {
      id: Date.now(), // Unique id generated using Date.now()
      country: country,
      locationDescription: locationDescription,
      createdTime: new Date().toLocaleString()
    };
    setLocations([...locations, newLocation]);
    setCountry('');
    setLocationDescription('');
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditingLocation(null); // Reset editingLocation when opening the modal for creating a new location
  };

  const handleEditNote = (location) => {
    setOpen(true);
    setEditingLocation(location);
    setCountry(location.country);
    setLocationDescription(location.locationDescription);
  };

  const handleCancelEdit = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLocation(null);
    setCountry('');
    setLocationDescription('');
  };

  const handleSaveEdit = () => {
    if (
      country.trim() === '' ||
      locationDescription.trim() === '' ||
      !editingLocation
    ) {
      alert('Please fill in all fields');
      return;
    }

    const editedNote = {
      ...editingLocation,
      country: country,
      locationDescription: locationDescription,
      editedTime: new Date().toLocaleString() // Add editedTime property
    };
    const updatedNotes = locations.map((n) =>
      n.id === editingLocation.id ? editedNote : n
    );
    setLocations(updatedNotes);
    handleClose();
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = locations.filter((location) => location.id !== id);
    setLocations(updatedNotes);
  };

  const user = {
    name: 'Akash Chhangani'
  };

  return (
    <>
      {/* For Change the title on web page */}
      <Helmet>
        <title>Location</title>
      </Helmet>

      {/* For display the main contain of the page  */}

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Location
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are the list of the Locations
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
              Create Location
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      {/* When creating a new location, this paper appears */}
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
            <LocationOnIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />{' '}
            {editingLocation ? 'Edit Location' : 'Create Location'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <InputLabel id="select-country-label">
                  Select Country
                </InputLabel>
                <Select
                  fullWidth
                  labelId="select-country-label"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {countries.sort().map((countryName, index) => (
                    <MenuItem key={index} value={countryName}>
                      {countryName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Location Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={locationDescription}
                  onChange={(e) => setLocationDescription(e.target.value)}
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
              if (editingLocation) {
                handleSaveEdit();
              } else {
                handleCreateLocation();
              }
              handleClose(); // Close the dialog after saving
            }}
          >
            {editingLocation ? 'Save' : 'Submit'}
          </Button>

          <Button
            onClick={editingLocation ? handleCancelEdit : handleClose}
            variant="contained"
            sx={{ margin: '1rem' }}
          >
            {editingLocation ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* When we add new locations, cards appear */}
      <Container maxWidth="lg">
        {locations.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            {locations.map((location, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: '100%', height: '100%' }}>
                  <CardHeader
                    action={
                      <IconButton
                        sx={{ marginRight: '0.5rem' }}
                        aria-label="edit"
                        color="success"
                        onClick={() => handleEditNote(location)}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                    title={location.country}
                  />
                  <CardContent>
                    <Typography variant="body2" color="black">
                      {location.locationDescription}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '0.5rem'
                    }}
                  >
                    <Typography variant="caption" display="block" gutterBottom>
                      {location.editedTime
                        ? `Edited At: ${location.editedTime}`
                        : `Created At: ${location.createdTime}`}
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteNote(location.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <DataNotFound />
        )}
      </Container>

      <Footer />
    </>
  );
};

export default location;
