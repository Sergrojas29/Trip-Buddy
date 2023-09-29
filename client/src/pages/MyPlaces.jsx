import React from 'react'
import { useState, useEffect } from 'react';


import GeoApiCall from '../utils/GetLocationAPI';
import listData from '../utils/listData';
import placeData from '../utils/placeData.json';

import PlaceList from '../components/PlaceList';
import Place from '../components/Place';
import { Link } from 'react-router-dom';

import {REMOVE_PLACE } from '../utils/mutations';
import AuthService from '../utils/auth'

function MyPlaces() {

  // const {email , username} = AuthService.getProfile().data


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




