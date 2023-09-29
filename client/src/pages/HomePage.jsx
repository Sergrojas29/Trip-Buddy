import * as React from 'react';
import GeoApiCall from '../utils/GetLocationAPI';
import listData from '../utils/listData';
import placeData from '../utils/placeData.json';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import { SAVE_PLACE, REMOVE_PLACE, GET_NEARBY_PLACES, GET_SINGLE_PLACE } from '../utils/mutations';

import PlaceList from '../components/PlaceList';
import Place from '../components/Place';
import { Button } from '@mui/material';


function Home() {
  console.log("Home component rendering")

  const [multiPlaceInfo, setMultiPlaceInfo] = useState([])
  const [singlePlaceInfo, setSinglePlaceInfo] = useState(null);


  const [getPlace] = useMutation(GET_SINGLE_PLACE)
  const [getPlaces] = useMutation(GET_NEARBY_PLACES)


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const citySearch = document.getElementById('citySearch').value

    console.log(citySearch)

    try {

      const { loading, data } = await getPlaces({
        variables: {
          city: citySearch
        }
      })

      console.log(data.getPlaces)
      setMultiPlaceInfo(data.getPlaces)
    } catch (error) {
      console.error(error)
    }

  }








  return (
    <>
      <main className="CenterArea">
        <h1 className="MainTitle"> Trip Buddy</h1>
        <h1 className="MainTitle"> Search a Location</h1>
        <Button onClick={handleFormSubmit}>
          CheckApiCall
        </Button>
        <Button onClick={() => console.log(multiPlaceInfo)} >
          checkUSEstate
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
            <section className="resultContain">
              
              {useEffect(() => {
                multiPlaceInfo.map((place, index) => {
                  while (index < 25) {
                    return (
                      <a className="previewContain" key={place.xid} href='#placeTitle' id={place.xid} onClick={(e) => console.log(e.target.id)} >
                        <div className="placeName" maxLength="15" id={place.xid} > {place.name} </div>
                        <div className="placeRating" id={place.xid} > RATING: {place.rate}</div>
                      </a>
                    );
                  }
                })
                // console.log(multiPlaceInfo)
              }, [multiPlaceInfo])}

            </section>

            {/* <PlaceList /> */}
          </section>

          <Place />
        </section>
      </main>
    </>
  );
}

export default Home;
