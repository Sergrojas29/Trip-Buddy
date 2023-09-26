import { gql } from '@apollo/client';

export const GET_PLACES = gql`
  query getPlaces($lon: Float!, $lat: Float!) {
      getPlaces(lon: $lon, lat: $lat){
        xid
        name
        location
        lat
        lon
        image
      }
  }`



export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
