import './App.css'
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import theme from './style/theme';

function App() {

  return (
    <>
      {/* <ThemeProvider theme={createTheme(theme)}> */}
      {/* <ThemeProvider > */}
      {/* <ThemeProvider/> */}
        <CssBaseline>
          {/* <BrowserRouter> */}
            <Navbar />
            <Outlet />            
          {/* </BrowserRouter> */}
        </CssBaseline>
      {/* </ThemeProvider> */}
    </>
  )
}

export default App
