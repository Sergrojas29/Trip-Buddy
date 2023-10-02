import * as React from 'react';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    // Clear the error state when the user types
    if (name === 'email') {
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
      const { data } = await login({
        variables: { ...userFormData },
      });
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });

      Auth.login(data.login.token);
    } catch (err) {

      console.error(err);
      
      window.alert(error)
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
