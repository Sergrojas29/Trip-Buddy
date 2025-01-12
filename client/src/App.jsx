import { CssBaseline } from '@mui/material';


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
import Footer from './components/Footer';

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
        <CssBaseline>
          <Navbar />
          <Outlet />
          <Footer />
        </CssBaseline>
      </ApolloProvider>
    </>
  );
}

export default App;
