import React from 'react'
import { useState, useEffect } from 'react';


import GeoApiCall from '../utils/GetLocationAPI';
import listData from '../utils/listData';
import placeData from '../utils/placeData.json';

import PlaceList from '../components/PlaceList';
import Place from '../components/Place';


function MyPlaces() {
  return (

    <main className="CenterArea">

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




