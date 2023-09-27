import * as React from 'react';
import GeoApiCall from '../utils/GetLocationAPI';
import listData from '../utils/listData';
import placeData from '../utils/placeData.json';
import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { GET_NEARBY_PLACES, GET_SINGLE_PLACE} from '../utils/queries'
import { SAVE_PLACE, REMOVE_PLACE } from '../utils/mutations';

import PlaceList from '../components/PlaceList';
import Place from '../components/Place';


function Home() {
  const { loading, data } = useQuery(GET_NEARBY_PLACES);
  // async function getCities(city) {
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

    // return;
  // }
    



  return (
    <>
      <main className="CenterArea">



        <h1 className="MainTitle"> Trip Buddy</h1>
        <h1 className="MainTitle"> Search a Location</h1>
        <div id="searchbarContainer">
          <input
            type="search"
            name="citySearch"
            id="citySearch"
            placeholder="Search for City"
          ></input>
          <div id="autosearch"></div>
        </div>

        <section className="resultContainer">



          <section className="listContainer">
            <PlaceList  />
          </section>

            <Place />


        </section>





      </main>
    </>
  );
}

export default Home;
