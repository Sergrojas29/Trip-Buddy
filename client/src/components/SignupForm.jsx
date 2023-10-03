import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { from, useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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
    const { name, value } = event.target;
    // setUserFormData({ ...userFormData, [name]: value });

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);

      if (userFormData.username === '') {
        setUsernameError(value ? '' : 'Username is required');
      }
      if (userFormData.email === '') {
        setEmailError(value ? '' : 'Email is required');
      }
      if (userFormData.password === '') {
        setPasswordError(value ? '' : 'Password is required');
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className='formContainer'
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
