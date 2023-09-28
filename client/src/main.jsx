import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import App from './App.jsx'
import ErrorPage from './pages/ErrorPage';
// import SearchLocation from './pages/SearchLocation'
import MyPlaces from './pages/MyPlaces'
import LoginPage from './pages/LoginPage.jsx';
import HomePage from "./pages/HomePage.jsx";




import "./App.css"



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'saved',
        element: <MyPlaces />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
