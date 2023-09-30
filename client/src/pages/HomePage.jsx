import * as React from 'react';
import listData from '../utils/listData';
import placeData from '../utils/placeData.json';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';


import { SAVE_PLACE, REMOVE_PLACE, GET_NEARBY_PLACES, GET_SINGLE_PLACE } from '../utils/mutations';

import PlaceList from '../components/PlaceList';
import Place from '../components/Place';
import { Button } from '@mui/material';


function Home() {


  const [multiPlaceInfo, setMultiPlaceInfo] = useState([])
  const [singlePlaceInfo, setSinglePlaceInfo] = useState(null);


  const [getPlace] = useMutation(GET_SINGLE_PLACE)
  const [getPlaces] = useMutation(GET_NEARBY_PLACES)
  const [savePlace] = useMutation(SAVE_PLACE)

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const citySearch = document.getElementById('citySearch').value


    try {

      const { loading, data } = await getPlaces({
        variables: {
          city: citySearch
        }
      })

  
      setMultiPlaceInfo(data.getPlaces)


      firstCall(data.getPlaces[0].xid)
    } catch (error) {
      console.error(error)
    }

  }

  async function firstCall(xid) {
    try {

      const { loading, data } = await getPlace({
        variables: {
          xid: xid
        }
      })
    
      setSinglePlaceInfo(data.getPlace)

    } catch (error) {
      console.log(error)
    }
  }

  const saveMyPlace = async (placeData) => {
  
    // Remove "__typename" from placeData
    function removeTypename(obj) {
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (key === '__typename') {
            delete obj[key];
          } else {
            removeTypename(obj[key]);
          }
        }
      }
      return obj;
    }
  
    // Remove "__typename" from placeData
    const trimmedData = removeTypename(placeData);
  
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    if (!token) {
      console.log('Token Failure');
      return false;
    }
  
    try {
      const { data } = await savePlace({
        variables: {
          place: { ...trimmedData },
        },
      });
  
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  





  return (
    <>
      <main className="CenterArea">
        <h1 className="MainTitle"> Trip Buddy</h1>
        <h1 className="MainTitle"> Search a Location</h1>
        <Button onClick={handleFormSubmit}>
          Search-Debug
        </Button>
        <Button onClick={() => firstCall("Q3089263")} >
          SinglePLace-Debug
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
              {multiPlaceInfo && multiPlaceInfo.map((place, index) => {
                while (index < 25) {
                  return (
                    <a className="previewContain" key={place.xid} href='#placeTitle' id={place.xid} onClick={(e) =>  {
                      console.log( e.target.id)
                      firstCall(e.target.id)
                    }} >
                      <div className="placeName" maxLength="15" id={place.xid} > {place.name} </div>
                      <div className="placeRating" id={place.xid} > RATING: {place.rate}</div>
                    </a>
                  )
                }
              })}
            </section>

            {/* <PlaceList /> */}


          </section>


          <section className="placeContainer">
            {singlePlaceInfo && (
              <>
                <p id='placeTitle'>{singlePlaceInfo.name}</p>
                {/* <img id='previewImg' src={singlePlaceInfo.preview.source} /> */}
                <p id='placeDescription'>{singlePlaceInfo.wikipedia_extracts.text}</p>
                {Auth.loggedIn() ? (
                  <>
                    <Button key={Auth.getProfile().data._id} id='savebtn' onClick={() => {saveMyPlace(singlePlaceInfo)}}>SAVE</Button>

                  </>
                ) : (
                  <Link to='/login'>
                    <button id='savebtn' >LOGIN</button>

                  </Link>
                )}
              </>
            )
            }



          </section>

          {/* <Place /> */}
        </section>
      </main>
    </>
  );
}

export default Home;
