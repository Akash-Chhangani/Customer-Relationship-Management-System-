import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import DataNotFound from 'src/content/pages/Status/DataNotFound';

const Notes = () => {
  const [heading, setHeading] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3003/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const createNote = async () => {
    try {
      const response = await axios.post('http://localhost:3003/notes', {
        title: heading,
        description: note
      });
      if (response.status === 201) {
        fetchNotes();
        handleClose();
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setHeading(note.title);
    setNote(note.description);
    setOpen(true);
  };

  const updateNote = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3003/notes/${editingNote._id}`,
        {
          title: heading,
          description: note
        }
      );
      if (response.status === 200) {
        fetchNotes();
        handleClose();
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3003/notes/${id}`);
      if (response.status === 200) {
        fetchNotes();

        
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingNote(null);
    setHeading('');
    setNote('');
  };

  return (
    <>
      <Helmet>
        <title>Notes</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Notes
            </Typography>
            <Typography variant="subtitle2">
              Catherine Pike, these are the list of the Notes
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ margin: '0.6rem' }}
              onClick={() => setOpen(true)}
            >
              <AddTwoToneIcon
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '5px'
                }}
              />
              Create Notes
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
            <DescriptionIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />
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
                updateNote();
              } else {
                createNote();
              }
            }}
          >
            {editingNote ? 'Save' : 'Submit'}
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
        {notes.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note._id}>
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
                    title={note.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="black">
                      {note.description}
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
                      onClick={() => handleDeleteNote(note._id)}
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
