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
  TextField,
  Typography
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { SetStateAction, useEffect, useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Footer from 'src/components/Footer';
import DataNotFound from 'src/content/pages/Status/DataNotFound';

const Notes = () => {
  const [heading, setHeading] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    // Retrieve notes data from local storage when component mounts
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    // Save notes data to local storage whenever it changes
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = () => {
    if (heading.trim() !== '' && note.trim() !== '') {
      const newNote = {
        id: Date.now(), // Unique id generated using Date.now()
        heading: heading,
        note: note,
        createdTime: new Date().toLocaleString()
      };
      setNotes([...notes, newNote]);
      setHeading('');
      setNote('');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditingNote(null); // Reset editingNote when opening the modal for creating a new note
  };

  const handleEditNote = (note: {
    heading: SetStateAction<string>;
    note: SetStateAction<string>;
  }) => {
    setOpen(true);
    setEditingNote(note);
    setHeading(note.heading);
    setNote(note.note);
  };

  const handleCancelEdit = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingNote(null);
    setHeading('');
    setNote('');
  };

  const handleSaveEdit = () => {
    if (heading.trim() !== '' && note.trim() !== '' && editingNote) {
      const editedNote = {
        ...editingNote,
        heading: heading,
        note: note,
        editedTime: new Date().toLocaleString() // Add editedTime property
      };
      const updatedNotes = notes.map((n) =>
        n.id === editingNote.id ? editedNote : n
      );
      setNotes(updatedNotes);
      handleClose();
    }
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const user = {
    name: 'Akash Chhangani'
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
              Notes
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are the list of the Notes
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
              Create Notes
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      {/* Whn create new Notes this aper */}
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
            <DescriptionIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />{' '}
            {editingNote ? 'Edit Note' : 'Create Notes'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  sx={{ marginTop: '1rem' }}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Note-Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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
              if (editingNote) {
                handleSaveEdit();
              } else {
                handleCreateNote();
              }
              handleClose(); // Close the dialog after saving
            }}
          >
            {editingNote ? 'Save' : 'Submit'}
          </Button>
          <Button
            // onClick={handleClose}
            onClick={editingNote ? handleCancelEdit : handleClose}
            variant="contained"
            sx={{ margin: '1rem' }}
          >
            {editingNote ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* when we add enw notes one card aper */}
      <Container maxWidth="lg">
        {notes.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            {notes.map((note, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: '100%', height: '100%' }}>
                  <CardHeader
                    action={
                      <IconButton
                        sx={{ marginRight: '0.5rem' }}
                        aria-label="edit"
                        onClick={() => handleEditNote(note)}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                    title={note.heading}
                  />
                  <CardContent>
                    <Typography variant="body2" color="black">
                      {note.note}
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
                      {note.editedTime
                        ? `Edited At: ${note.editedTime}`
                        : `Created At: ${note.createdTime}`}
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteNote(note.id)}
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

export default Notes;
