import { gql } from '@apollo/client';

export const GET_NEARBY_PLACES = gql`
  query getPlaces($lon: Float!, $lat: Float!) {
    getPlaces(lon: $lon, lat: $lat) {
      xid
      name
      location
      image
    }
  }
`;

export const GET_SINGLE_PLACE = gql`
  query getPlace($xid: String!) {
    getPlace(xid: $xid) {
      xid
      name
      address
      image
    }
  }
`;

// export const GET_SINGLE_PLACE = gql`
//   query getPlace($xid: String!) {
//     getPlace(xid: $xid) {
//       xid
//       name
//       location
//       lat
//       lon
//       image
//     }
//   }
// `;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
