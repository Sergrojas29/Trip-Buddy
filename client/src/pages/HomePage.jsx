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
import SaveButton from '../components/SaveButton';


function Home() {


  const [multiPlaceInfo, setMultiPlaceInfo] = useState([])
  const [singlePlaceInfo, setSinglePlaceInfo] = useState(null);

  const [debugState, setDebugState] = useState(false);

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
      console.log(singlePlaceInfo)
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


  function PlaceContainer() {
    if (multiPlaceInfo.length > 0) {
      // if (debugState) {

      return (
        <section className="resultContainer">

          {/* <ListRender list={multiPlaceInfo} /> */}
          <ListRender />
          <PlaceRender place={singlePlaceInfo} />
          {/* <DebugFunction place={singlePlaceInfo} /> */}
        </section>
      )
    } else {
      return <></>
    }
  }

  function ListRender() {
    // const data = props.list
    // const data = props.list.features
    if (multiPlaceInfo.length > 0) {
      const data = multiPlaceInfo
      return (
        <section className="listContainer">
          {data.map((place, index) => {
            while (index < 25) {
              return (
                <div className="previewContain" style={{ height: '300px' }} key={place.xid} href='#placeTitle' id={place.xid} onClick={(e) => { firstCall(e.target.id) }} >
                  <div className="placeName" maxLength="15" id={place.xid} > {place.name} </div>
                  <div className="placeRating" id={place.xid} > RATING: {place.rate}</div>
                </div>
              )
            }

          })}
        </section >
      )
    }
  }

  function PlaceRender() {
    const data = singlePlaceInfo
    if (data !== null) {
      const { xid, name, preview, wikipedia_extracts, address } = data
      return (
        <section className="placeContainer">

          <p id='placeTitle'>{name}</p>
          {preview && <img id='previewImg' src={data.preview.source} alt='preview' />}
          {wikipedia_extracts && <p id='placeDescription'>{wikipedia_extracts.text}</p>}
          <button className="addressContainer">
            <div className="addressLineOne">
              {address && <div className='addressText' >{address.house_number}</div>}
              {address && <div className='addressText' >{address.road}</div>}
              {address && <div className='addressText' >{address.city}</div>}
            </div>
            <div className="addressLineTwo">
              {address && <div className='addressText' >{address.neighbourhood}</div>}
              {address && <div className='addressText' >{address.postcode}</div>}
              {address && <div className='addressText' >{address.country_code}</div>}
            </div>
          </button>

          <SaveButton xid={xid} saveMyPlace={saveMyPlace} data={data}/>
        </section>
      )
    }

  }






  return (
    <>
      <main className="CenterArea">
        <h1 className="MainTitle"> Trip Buddy</h1>
        <h1 className="MainTitle"> Search a Location</h1>
        <Button onClick={handleFormSubmit}>
          Search-Debug
        </Button>
        <Button onClick={() => setDebugState(true)} >
          SinglePLace-Debug
        </Button>
        <Button onClick={() => firstCall("N338451025")} >
          OneCall-Debug
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

        <PlaceContainer />

      </main>
    </>
  );
}

export default Home;
