import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import { ADD_USER, LOGIN_USER } from '../utils/mutations';

export default function LoginPage() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Sign Up" value="1" />
            <Tab label="Log In" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SignupForm />
        </TabPanel>
        <TabPanel value="2">
          <LoginForm />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
