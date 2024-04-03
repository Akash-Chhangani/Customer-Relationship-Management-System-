import React, { useState } from 'react';
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
  CardHeader,
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

const Email = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [templates, setTemplates] = useState([]);
  const [expandedTemplates, setExpandedTemplates] = useState([]);
  const [open, setOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false); // State to control rendering of StatusComingSoon

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    // Save the template data
    const newTemplate = { title, content };
    setTemplates([...templates, newTemplate]);
    // Reset fields
    setContent('');
    setTitle('');
    setOpen(false);
  };

  const toggleExpand = (index) => {
    const updatedExpandedTemplates = [...expandedTemplates];
    updatedExpandedTemplates[index] = !updatedExpandedTemplates[index];
    setExpandedTemplates(updatedExpandedTemplates);
  };

  const handleUseTemplate = () => {
    setShowComingSoon(!showComingSoon); // Toggle the state
  };

  const user = {
    name: 'Catherine Pike'
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
            Create Template
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
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <JoditEditor
                  value={content}
                  onBlur={(newContent) => setContent(newContent)}
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Container>
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
                    variant="h6" // You can adjust the variant to your desired size
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      fontSize: '1.5rem' // Increase font size
                    }}
                  >
                    {template.title}
                    <IconButton
                      sx={{ marginLeft: '0.5rem' }} // Adjust the spacing as needed
                      aria-label="success"
                      onClick={() => toggleExpand(index)}
                    >
                      <EditIcon sx={{ color: 'green' }} />
                    </IconButton>
                  </Typography>
                  {expandedTemplates[index] ? (
                    <Typography variant="body1">{template.content}</Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 10, // Number of lines to show before truncating
                        WebkitBoxOrient: 'vertical'
                      }}
                      dangerouslySetInnerHTML={{ __html: template.content }}
                    />
                  )}
                </CardContent>

                <CardActions
                  sx={{
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'space-around'
                  }}
                >
                  <IconButton aria-label="add to favorites" color="primary">
                    <VisibilityIcon onClick={() => toggleExpand(index)} />
                  </IconButton>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>

                  <IconButton aria-label="share" color="primary">
                    <ShareIcon /> {/* Change color to blue */}
                  </IconButton>

                  <IconButton aria-label="delete" color="error">
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleUseTemplate} // Call handleUseTemplate when the button is clicked
                  >
                    Use this Template
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />

      {/* Render StatusComingSoon component if showComingSoon is true */}
      {showComingSoon && <StatusComingSoon />}
    </>
  );
};

export default Email;
