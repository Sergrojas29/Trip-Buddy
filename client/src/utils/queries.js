import { gql } from '@apollo/client';

export const GET_NEARBY_PLACES = gql`
  query Query($lon: Float!, $lat: Float!) {
    getPlaces(lon: $lon, lat: $lat) {
      xid
      name

    }
  }`;

export const GET_SINGLE_PLACE = gql`
  query Query($xid: String!) {
    getPlace(xid: $xid) {
      name
      address {
        road
        house
        state
        suburb
        country
        postcode
        country_code
        house_number
        state_district
      }
      image
    }
  }
`;


export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
