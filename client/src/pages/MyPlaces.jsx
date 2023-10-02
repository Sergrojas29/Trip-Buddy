import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { REMOVE_PLACE } from '../utils/mutations';
import { GET_ME } from '../utils/queries'
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';

function MyPlaces() {

  const [userData, setUserData] = useState({});

  const [removePlace] = useMutation(REMOVE_PLACE)

  const { loading, data, error } = useQuery(GET_ME)

  // const {email , username} = AuthService.getProfile().data
  useEffect(() => {
    if (!loading && data?.me) {
      setUserData(data.me)
      console.log(data.me)
    }
  }, [loading, data])


  const handleRemovePlace = async (xid) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    console.log(typeof xid)
    try {
      const { data } = await removePlace({
        variables: {
          xid: xid
        },
      });
      console.log(data)
    } catch (error) {
      console.log(error)
      console.error(error);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }



  function UserSavedPlaces() {
    
  }



  return (

    <main className="CenterArea">

      <div id="myplaces"> {userData.username}'s places </div>


      <section className="myPlaceContainer">
        {userData.savedPlaces && userData.savedPlaces.map((data) => {

          return (
            <div key={data.xid} className="savePlaceItems">
              <div className="imgContainer">
                {data.preview && <img className='thumblenail' src={data.preview.source} alt="" />}
              </div>
              <div className="infoContainer">
                <h1 className='title' >{data.name}</h1>
                <Button className='btn' onClick={() => handleRemovePlace(data.xid)}>
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          )
        })}

      </section>






















{/* 
      <section className="resultContainer">

        <div>
          {userData.savedPlaces && userData.savedPlaces.map((place) => {
            return (
              <div key={place.xid}>
                <div border='dark'>
                  {place.image ? <img src={place.preview.source} alt={` ${place.name}`} /> : null}
                  <div>
                    <h1>{place.name}</h1>
                    <p className='small'>Address:
                      {` ${place.address.house_number}, ${place.address.road}, ${place.address.state}, ${place.address.country}, ${place.address.postcode}`}
                    </p>


                    <Button className='btn-block btn-danger' onClick={() => handleRemovePlace(place.xid)}>
                      Remove this Place!
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </section> */}





    </main>








  )
}

export default MyPlaces




