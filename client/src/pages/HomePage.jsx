import * as React from 'react';
import GeoApiCall from '../utils/GetLocationAPI';
import listData from '../utils/listData';
import placeData from '../utils/placeData.json';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import PlaceList from '../components/PlaceList';

function Home() {
  // GeoApiCall.getlocation('austin')
  async function getCities(city) {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      const selectedCity = data.results[0];
      const { latitude, longitude } = selectedCity;
      console.log(`${latitude}, and ${longitude}`);
    } catch (error) {
      console.log(error);
    }

    return;
  }
  console.log(listData.features);
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
            <PlaceList />
          </section>
          <section className='placeContainer'>
              <h1 id='placeTitle'>title</h1>
              <img id='previewImg' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Cathedral_of_the_Immaculate_Conception_Albany.jpg/400px-Cathedral_of_the_Immaculate_Conception_Albany.jpg"/> 
              <p id='placeDescription'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora ea facere, architecto, explicabo sed, et quae impedit natus magnam exercitationem soluta nihil facilis. Consectetur reprehenderit veniam ducimus nesciunt quibusdam ad.</p>

              <button>SAVE / Login in</button>

          </section>


        </section>





      </main>
    </>
  );
}

export default Home;
