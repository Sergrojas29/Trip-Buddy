import React from 'react';
import { useState, useEffect } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

// import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LoginPage() {
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <div>TEST LOGIN PAGE</div>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sign Up" {...a11yProps(0)} />
          <Tab label="Log In" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {SignupForm}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {LoginForm}
      </CustomTabPanel>
    </Box>
  );
}

// function LoginPage() {
  // return (
  //   <>
      
      // <SignupForm />
      // <LoginForm />
    // </>
//   );
// }

export default LoginPage;
