import React from 'react'
import { useState, useEffect } from 'react';


import GeoApiCall from '../utils/GetLocationAPI';
import listData from '../utils/listData';
import placeData from '../utils/placeData.json';

import PlaceList from '../components/PlaceList';
import Place from '../components/Place';
import { Link } from 'react-router-dom';

import { REMOVE_PLACE } from '../utils/mutations';
import { GET_ME } from '../utils/queries'
import AuthService from '../utils/auth'
import { useMutation, useQuery } from '@apollo/client';

function MyPlaces() {

  const [userData, setUserData] = useState({});

  const [removePlace] = useMutation(REMOVE_PLACE)

  const { loading, data, error } = useQuery(GET_ME)

  // const {email , username} = AuthService.getProfile().data
  useEffect(() => {
    if (!loading && data?.me) {
      setUserData(data.me)
    }
  }, [loading, data])


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleRemovePlace = async (placeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removePlace({
        variables: {
          placeId: placeId
        },
      });
     
    } catch (error) {
      console.log(error)
      console.error(error);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }


  return (

    <main className="CenterArea">

      <div id="myplaces"> username's places </div>

      <section className="resultContainer">

        <section className="listContainer">
          <PlaceList />
        </section>

        <Place />


      </section>





    </main>








  )
}

export default MyPlaces




