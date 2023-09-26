import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
// import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

// import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
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
      const { data } = await login({
        variables: { ...userFormData },
      });

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      Auth.login(data.login.token);
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
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </div>
        <div>
          <TextField
            required
            label="Password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
        </div>
        <div>
          <Button variant="contained" onClick={handleFormSubmit} type="submit">
            Submit
          </Button>
        </div>
      </Box>
    </>
  );
};

export default LoginForm;
