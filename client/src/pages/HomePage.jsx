import * as React from 'react';
import GeoApiCall from '../utils/GetLocationAPI';
import listData from '../utils/listData';
import placeData from '../utils/placeData.json';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { GET_NEARBY_PLACES, GET_SINGLE_PLACE } from '../utils/queries';
import { SAVE_PLACE, REMOVE_PLACE } from '../utils/mutations';

import PlaceList from '../components/PlaceList';
import Place from '../components/Place';
import { Button } from '@mui/material';


function Home() {
  console.log("Home component rendering")

  const [multiPlaceData, setMultiPlaceData] = useState([])
  const [singlePlaceData, setSinglePlaceData] = useState(null);


  const fetchPlaces = async (lat, lon) => {
    try {
      const { loading, data, error } = useQuery(GET_NEARBY_PLACES, {
        variables: {
          lon: lon,
          lat: lat,
        },
      });

      // Update the state within the component
      setMultiPlaceData(data.getPlaces);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  const fetchPlace = async (xid) => {
    try {
      const { loading, data, error } = useQuery(GET_SINGLE_PLACE, {
        variables: {
          xid: xid,
        },
      });

      if (!loading && !error) {
        setSinglePlaceData(data.getPlace);
        console.log(data.getPlace);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // useEffect(() => {
  //   if (!loadingMulti && !errorMulti) {
  //     // Access the data using the correct field name for GET_NEARBY_PLACES
  //     setCityData(dataMulti.getPlaces);
  //     console.log(dataMulti.getPlaces);
  //   } else if (!loadingSing && !errorSing) {
  //     // Access the data using the correct field name for GET_SINGLE_PLACE
  //     // Handle dataSing as needed
  //   }
  // }, [loadingMulti, errorMulti, loadingSing, errorSing]);
  

  // Render your component content here


  //  async function getCities(city) {
  // try {
  //   const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   const selectedCity = data.results[0];
  //   const { latitude, longitude } = selectedCity;
  //   console.log(`${latitude}, and ${longitude}`);
  // } catch (error) {
  //   console.log(error);
  // }


  //  return;
  // }}

  



  return (
    <>
      <main className="CenterArea">
        <h1 className="MainTitle"> Trip Buddy</h1>
        <h1 className="MainTitle"> Search a Location</h1>
        <Button onClick={() => fetchPlace("Q7411545")}>
          Button
        </Button>
        <div className="searchbarContainer">
          <input
            type="search"
            name="citySearch"
            id="citySearch"
            placeholder="Search for City"
          ></input>
          <div id="autosearch"></div>
        </div>

        <section className="resultContainer">

          <section className="searchContainer">

          </section>


          <section className="listContainer">
            <PlaceList />
          </section>

          <Place />
        </section>
      </main>
    </>
  );
}

export default Home;
