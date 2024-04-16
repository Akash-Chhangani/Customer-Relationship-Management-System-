// import { useState, useEffect } from 'react';
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   IconButton,
//   TextField,
//   Typography
// } from '@mui/material';
// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { Helmet } from 'react-helmet-async';
// import DataNotFound from 'src/content/pages/Status/DataNotFound';
// import PageTitleWrapper from 'src/components/PageTitleWrapper';
// import Footer from 'src/components/Footer';

// const Office = () => {
//   const [open, setOpen] = useState(false);
//   const [submitOfficeData, setSubmitOfficeData] = useState([]);
//   const [editingOffice, setEditingOffice] = useState(null);
//   const [officeData, setOfficeData] = useState({
//     officeName: '',
//     officeDescription: ''
//   });

//   // Function to handle input change in text fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setOfficeData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // Function to handle form submission
//   const handleSubmit = () => {
//     const emptyFields = Object.values(officeData).some(
//       (value) => value.trim() === ''
//     );
//     if (emptyFields) {
//       alert('Please fill in all fields.');
//     } else {
//       const currentTime = new Date().toLocaleString();
//       setSubmitOfficeData((prevData) => [
//         ...prevData,
//         { ...officeData, createdTime: currentTime, editedTime: currentTime }
//       ]);
//       setOfficeData({
//         officeName: '',
//         officeDescription: ''
//       });
//       setOpen(false);
//     }
//   };

//   // Function to handle opening dialog for editing
//   const handleEditCard = (data) => {
//     setOfficeData(data);
//     setEditingOffice(data);
//     setOpen(true);
//   };

//   // Function to handle deleting office data
//   const handleDelete = (index) => {
//     const newOfficeData = submitOfficeData.filter((_, i) => i !== index);
//     setSubmitOfficeData(newOfficeData);
//     localStorage.setItem('submitOfficeData', JSON.stringify(newOfficeData));
//   };

//   // Function to handle dialog close
//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Function to handle canceling edit
//   const handleCancelEdit = () => {
//     setOpen(false);
//     setEditingOffice(null);
//   };

//   // Function to handle saving edits
//   const handleSaveEdit = () => {
//     const emptyFields = Object.values(officeData).some(
//       (value) => value.trim() === ''
//     );
//     if (emptyFields) {
//       alert('Please fill in all fields.');
//     } else {
//       const updatedOfficeData = submitOfficeData.map((item) =>
//         item === editingOffice ? officeData : item
//       );
//       setSubmitOfficeData(updatedOfficeData);
//       setOfficeData({ officeName: '', officeDescription: '' });
//       setOpen(false);
//     }
//   };

//   // Load data from local storage when component mounts
//   useEffect(() => {
//     const storedData = localStorage.getItem('submitOfficeData');
//     if (storedData) {
//       setSubmitOfficeData(JSON.parse(storedData));
//     }
//   }, []);

//   // Render component
//   return (
//     <>
//       <Helmet>
//         <title>Office</title>
//       </Helmet>
//       <PageTitleWrapper>
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Grid item>
//             <Typography variant="h3" component="h3" gutterBottom>
//               Office
//             </Typography>
//             <Typography variant="subtitle2">
//               These are the list of the Offices
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="success"
//               sx={{ margin: '0.6rem' }}
//               onClick={() => {
//                 setEditingOffice(null);
//                 setOpen(true);
//               }}
//             >
//               <AddTwoToneIcon
//                 sx={{
//                   fontSize: '1.5rem',
//                   fontWeight: 'bold',
//                   color: 'white',
//                   marginRight: '5px'
//                 }}
//               />
//               Create Office
//             </Button>
//           </Grid>
//         </Grid>
//       </PageTitleWrapper>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-describedby="alert-dialog-description"
//         aria-labelledby="alert-dialog-title"
//       >
//         <DialogTitle id="alert-dialog-title">
//           <Typography
//             sx={{
//               marginTop: '1rem',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontWeight: 'bold',
//               fontSize: '24px'
//             }}
//           >
//             <LocationOnIcon
//               sx={{
//                 fontSize: '2rem',
//                 fontWeight: 'bold',
//                 color: 'green',
//                 marginRight: '5px'
//               }}
//             />
//             {editingOffice ? 'Edit Office' : 'Create Office'}
//           </Typography>
//         </DialogTitle>

//         <DialogContent>
//           <Grid container>
//             <Grid item xs={12}>
//               <TextField
//                 margin="normal"
//                 label="Office Name"
//                 fullWidth
//                 name="officeName"
//                 value={officeData.officeName}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="normal"
//                 label="Office Description"
//                 fullWidth
//                 name="officeDescription"
//                 multiline
//                 rows={4}
//                 value={officeData.officeDescription}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions>
//           <Button
//             variant="contained"
//             color="success"
//             sx={{ margin: '0.6rem' }}
//             onClick={editingOffice ? handleSaveEdit : handleSubmit}
//           >
//             {editingOffice ? 'Save' : 'Submit'}
//           </Button>
//           <Button
//             onClick={handleCancelEdit}
//             variant="contained"
//             sx={{ margin: '1rem' }}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Container maxWidth="lg">
//         {submitOfficeData.length > 0 ? (
//           <Grid
//             container
//             spacing={3}
//             direction="row"
//             justifyContent="center"
//             alignItems="stretch"
//           >
//             {submitOfficeData.map((office, index) => (
//               <Grid item key={index} xs={12} sm={6} md={4}>
//                 <Card sx={{ maxWidth: '100%', height: '100%' }}>
//                   <CardHeader
//                     // title={office.officeName}
//                     action={
//                       <>
//                         <IconButton
//                           onClick={() => handleEditCard(office)}
//                           sx={{ marginRight: '0.5rem' }}
//                           aria-label="edit"
//                           color="success"
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </>
//                     }
//                     title={office.officeName}
//                   />
//                   <CardContent>
//                     <Typography variant="body2" color="black">
//                       Description: {office.officeDescription}
//                     </Typography>
//                   </CardContent>

//                   <CardActions
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       margin: '0.5rem'
//                     }}
//                   >
//                     <Typography variant="caption" display="block" gutterBottom>
//                       {office.editedTime
//                         ? `Edited At: ${office.editedTime}`
//                         : `Created At: ${office.createdTime}`}
//                     </Typography>
//                     <IconButton
//                       onClick={() => handleDelete(index)}
//                       aria-label="delete"
//                       color="error"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <DataNotFound />
//         )}
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default Office;

import { useState, useEffect } from 'react';
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

const office = () => {
  const [country, setCountry] = useState('');
  const [officeDescription, setOfficeDescription] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [office, setOffice] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Retrieve office data from local storage when component mounts
    const storedNotes = localStorage.getItem('office');
    if (storedNotes) {
      setOffice(JSON.parse(storedNotes));
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
    // Save office data to local storage whenever it changes
    localStorage.setItem('office', JSON.stringify(office));
  }, [office]);

  const handleCreateNote = () => {
    if (
      country.trim() !== '' &&
      officeDescription.trim() !== '' &&
      officeName.trim() !== ''
    ) {
      const newOffice = {
        id: Date.now(), // Unique id generated using Date.now()
        country: country,
        officeDescription: officeDescription,
        officeName: officeName,
        createdTime: new Date().toLocaleString()
      };
      setOffice([...office, newOffice]);
      setCountry('');
      setOfficeDescription('');
      setOfficeName('');
    } else {
      // Show an alert or error message indicating that all fields are required
      alert('Please fill in all fields');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditingOffice(null); // Reset editingOffice when opening the modal for creating a new office
  };

  const handleEditNote = (office) => {
    setOpen(true);
    setEditingOffice(office);
    setCountry(office.country);
    setOfficeDescription(office.officeDescription);
    setOfficeName(office.officeName);
  };

  const handleCancelEdit = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingOffice(null);
    setCountry('');
    setOfficeDescription('');
    setOfficeName('');
  };

  const handleSaveEdit = () => {
    if (
      country.trim() !== '' &&
      officeDescription.trim() !== '' &&
      officeName.trim() !== '' &&
      editingOffice
    ) {
      const editedNote = {
        ...editingOffice,
        country: country,
        officeDescription: officeDescription,
        officeName: officeName,
        editedTime: new Date().toLocaleString() // Add editedTime property
      };
      const updatedNotes = office.map((n) =>
        n.id === editingOffice.id ? editedNote : n
      );
      setOffice(updatedNotes);

      // Close the dialog only if it's in the editing mode
      if (editingOffice) {
        setOpen(false); // Close the dialog after saving
        setEditingOffice(null); // Disable editing mode
      }
    } else {
      // Show an alert or error message indicating that all fields are required
      alert('Please fill in all fields');
    }
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = office.filter((office) => office.id !== id);
    setOffice(updatedNotes);
  };

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
              Create Office
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
            <LocationOnIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />{' '}
            {editingOffice ? 'Edit Office' : 'Create Office'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                id="outlined-multiline-static"
                label="Office Name"
                variant="outlined"
                fullWidth
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="select-country-label">Select Country</InputLabel>
              <Select
                sx={{ marginBottom: '1rem' }}
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
                label="Office Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={officeDescription}
                onChange={(e) => setOfficeDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="success"
            sx={{ margin: '0.6rem' }}
            onClick={() => {
              if (editingOffice) {
                handleSaveEdit();
              } else {
                handleCreateNote();
              }
              handleClose(); // Close the dialog after saving
            }}
          >
            {editingOffice ? 'Save' : 'Submit'}
          </Button>

          <Button
            onClick={editingOffice ? handleCancelEdit : handleClose}
            variant="contained"
            sx={{ margin: '1rem' }}
          >
            {editingOffice ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg">
        {office.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            {office.map((office, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: '100%', height: '100%' }}>
                  <CardHeader
                    action={
                      <IconButton
                        sx={{ marginRight: '0.5rem' }}
                        aria-label="edit"
                        color="success"
                        onClick={() => handleEditNote(office)}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                    title={office.officeName}
                  />

                  <CardContent>
                    <Typography variant="body2" color="black">
                      Location : {office.country}
                    </Typography>
                    <Typography variant="body2" color="black">
                      Description : {office.officeDescription}
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
                      {office.editedTime
                        ? `Edited At: ${office.editedTime}`
                        : `Created At: ${office.createdTime}`}
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteNote(office.id)}
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

export default office;
