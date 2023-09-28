import * as React from 'react';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    // Clear the error state when the user types
    if (name === 'email') {
      setEmailError('');
    } else if (name === 'password') {
      setPasswordError('');
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      // You can also set error messages here if needed
      setEmailError('Please enter a valid email address');
      setPasswordError('Please enter a valid password');
    } else {
      // Clear error messages if form is valid
      setEmailError('');
      setPasswordError('');
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      if (data.login.token) {
        localStorage.setItem('token', data.login.token);
        Auth.login(data.login.token);
      } else {
        console.error('No token found in the login response');
        // Set the login error message for incorrect email/password
        setLoginError('Incorrect email or password');
      }
    } catch (err) {
      console.error(err);
      // Set the login error message for server errors
      setLoginError('An error occurred while logging in');
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
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
      {/* Display the login error message */}
      {loginError && <div className="error-message">{loginError}</div>}
    </>
  );
};

export default LoginForm;
