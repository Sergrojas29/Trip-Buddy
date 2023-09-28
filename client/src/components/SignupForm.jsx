import { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

// import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // set state for form validation
  // const [validated] = useState(false);

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });

    // Add validation logic for each field here
    if (name === 'username') {
      setUsernameError(value ? '' : 'Username is required');
    } else if (name === 'email') {
      setEmailError(value ? '' : 'Email is required');
    } else if (name === 'password') {
      setPasswordError(value ? '' : 'Password is required');
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          label="Username"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username}
          error={Boolean(usernameError)}
          helperText={usernameError}
        />
      </div>
      <div>
        <TextField
          required
          label="Email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          error={Boolean(emailError)}
          helperText={emailError}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleFormSubmit} type="submit">
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default SignupForm;
