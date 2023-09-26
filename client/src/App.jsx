// import './App.css';
// import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ApolloClient, ApolloProvider } from '@apollo/client';
// import Navbar from './components/Navbar';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import theme from './style/theme';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import './App.css';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {


  return (
    <>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </>
  );
}

export default App;
