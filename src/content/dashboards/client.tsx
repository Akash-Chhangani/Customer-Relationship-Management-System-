import { TextField, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Crypto/client.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function client() {
  return (
    <>
      <div
        className="main"
        style={{
          display: 'grid',
          paddingTop: '1rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 'large',
            margin: '0',
            padding: '0'
          }}
        >
          <FontAwesomeIcon icon={faUser} className="my-auto my-auto " />
          <h1>Create Client</h1>
        </div>
        <div
          className="container"
          style={{
            height: '63vh',
            width: '60rem ',
            display: 'grid',
            gridTemplateColumns: 'Repeat(2,1fr)',
            overflow: 'hidden',
            border: '2px solid black',
            margin: '2rem',
            marginLeft: '4rem',
            marginTop: '0',
            marginBottom: '0',
            padding: '2rem',
            borderRadius: '5rem'
          }}
        >
          <TextField
            //   sx={{ margin: 3, width: '30rem' }}
            sx={{ margin: '1rem', width: '25rem', height: '1rem' }}
            id="outlined-basic"
            label="Company Name"
            variant="outlined"
            required
          />
          <TextField
            //   sx={{ margin: 3, width: '30rem' }}
            sx={{ margin: '1rem', width: '25rem' }}
            id="outlined-basic"
            label=" Company Mail Id"
            variant="outlined"
            required
          />
          <TextField
            //   sx={{ margin: 3 ,width: '30rem'}}
            sx={{ margin: '1rem', width: '25rem' }}
            id="outlined-basic"
            label="Office ID"
            type="mail"
            variant="outlined"
          />
          <TextField
            sx={{ margin: '1rem', width: '25rem' }}
            //   sx={{ margin: 3, width: '30rem' }}
            id="outlined-basic"
            label="Address"
            variant="outlined"
          />

          <TextField
            //   sx={{ margin: 3, maxWidth: '30rem' }}
            sx={{ margin: '1rem', width: '25rem' }}
            id="outlined-basic"
            label="Company Id"
            variant="outlined"
          />
          <TextField
            //   sx={{ margin: 3, width: '30rem' }}
            sx={{ margin: '1rem', width: '25rem' }}
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
          />
          <TextField
            sx={{ margin: '1rem', width: '25rem' }}
            //   sx={{ margin: 3, width: '30rem' }}
            id="outlined-basic"
            label="Location"
            variant="outlined"
          />
          <TextField
            sx={{ margin: '1rem', width: '25rem' }}
            //   sx={{ margin: 3, width: '30rem' }}
            id="outlined-basic"
            label="Status"
            variant="outlined"
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifySelf: 'center',
            margin: '1rem'
          }}
        >
          <Button variant="contained" color="success">
            {' Submit'}
          </Button>
        </div>
      </div>
    </>
  );
}
