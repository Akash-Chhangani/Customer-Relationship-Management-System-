import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  CardActions,
  Container
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import JoditEditor from 'jodit-react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Footer from 'src/components/Footer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StatusComingSoon from 'src/content/pages/Status/ComingSoon';
import DataNotFound from 'src/content/pages/Status/DataNotFound';

const Email = () => {
  const [templates, setTemplates] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showComingSoon, setShowComingSoon] = useState(false); // State to control rendering of StatusComingSoon
  const [editingTemplate, setEditingTemplate] = useState(false); // State to track if editing a template

  useEffect(() => {
    // Retrieve email templates data from local storage when component mounts
    const storedTemplates = localStorage.getItem('emailTemplates');
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    }
  }, []);

  useEffect(() => {
    // Save email templates data to local storage whenever it changes
    localStorage.setItem('emailTemplates', JSON.stringify(templates));
  }, [templates]);

  const handleClose = () => {
    setOpen(false);
    setEditingTemplate(false); // Reset editingTemplate state
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedTemplates = [...templates];
      updatedTemplates[editIndex] = { title: editTitle, content: editContent };
      setTemplates(updatedTemplates);
      setEditIndex(null);
      setEditTitle('');
      setEditContent('');
      setOpen(false); // Close the dialog after saving
      setEditingTemplate(false); // Reset editingTemplate state
    }
  };

  const handleEditTemplate = (index) => {
    const template = templates[index];
    setEditIndex(index);
    setEditTitle(template.title); // Set the title for editing
    setEditContent(template.content); // Set the content for editing
    setOpen(true); // Open the dialog
    setEditingTemplate(true); // Set editingTemplate to true
  };

  const handleCreateTemplate = () => {
    const newTemplate = { title: editTitle, content: editContent }; // Use editTitle and editContent for new template
    if (editIndex !== null) {
      const updatedTemplates = [...templates];
      updatedTemplates[editIndex] = newTemplate;
      setTemplates(updatedTemplates);
    } else {
      setTemplates([...templates, newTemplate]);
    }
    // Reset fields
    setEditIndex(null); // Reset editIndex
    setEditTitle('');
    setEditContent('');
    setOpen(false); // Close the dialog after saving
    setEditingTemplate(false); // Reset editingTemplate state
  };

  const handleUseTemplate = () => {
    setShowComingSoon(!showComingSoon); // Toggle the state
  };

  const handleDeleteTemplate = (index) => {
    const updatedTemplates = [...templates];
    updatedTemplates.splice(index, 1); // Remove the template at the specified index
    setTemplates(updatedTemplates); // Update the state
  };

  const user = {
    name: 'Akash Chhangani'
  };

  return (
    <>
      <Helmet>
        <title>Email</title>
      </Helmet>

      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Email
            </Typography>
            <Typography variant="subtitle2">
              {user.name}, these are the list of the Email
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ margin: '0.6rem' }}
              onClick={handleClick}
            >
              <AddTwoToneIcon
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '5px'
                }}
              />{' '}
              Create Templates
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            height: '100%',
            margin: 0
          }
        }}
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
            <NoteAddIcon
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'green',
                marginRight: '5px'
              }}
            />{' '}
            {editingTemplate ? 'Edit Template' : 'Create Template'}
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '0 !important'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  value={editTitle} // Use editTitle for editing
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <JoditEditor
                  value={editContent} // Use editContent for editing
                  onBlur={(newContent) => setEditContent(newContent)}
                  config={{
                    style: {
                      height: '20.5rem'
                    }
                  }}
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
              if (editingTemplate) {
                handleSaveEdit();
              } else {
                handleCreateTemplate();
              }
              handleClose(); // Close the dialog after saving
            }}
          >
            {editingTemplate ? 'Save' : 'Submit'}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={handleClose}
          >
            {editingTemplate ? 'Cancel' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>

      <Container>
        {templates.length > 0 ? (
          <Grid container spacing={2} justifyContent="center">
            {templates.map((template, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    border: '1px solid black',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}
                    >
                      {template.title}
                      <IconButton
                        sx={{ marginLeft: '0.5rem' }}
                        aria-label="success"
                        onClick={() => handleEditTemplate(index)}
                      >
                        <EditIcon sx={{ color: 'green' }} />
                      </IconButton>
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 10,
                        WebkitBoxOrient: 'vertical'
                      }}
                      dangerouslySetInnerHTML={{ __html: template.content }}
                    />
                  </CardContent>

                  <CardActions
                    sx={{
                      marginTop: 'auto',
                      display: 'flex',
                      justifyContent: 'space-around'
                    }}
                  >
                    <IconButton aria-label="add to favorites" color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>

                    <IconButton aria-label="share" color="primary">
                      <ShareIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteTemplate(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleUseTemplate}
                    >
                      Use this Template
                    </Button>
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

      {showComingSoon && <StatusComingSoon />}
    </>
  );
};

export default Email;
