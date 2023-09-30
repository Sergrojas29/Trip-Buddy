import { gql } from '@apollo/client';

// import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_PLACE = gql`
  mutation savePlace($place: PlaceInput!) {
    savePlace(place: $place) {
      xid
      name
      address
      image
    }
  }
`;

export const REMOVE_PLACE = gql`
  mutation removePlace($placeId: ID) {
    removePlace(xid: $placeId) {
      _id
      username
      email
      place {
        xid
        name
        location
        lat
        lon
        image
      }
    }
  }
`;

export const GET_NEARBY_PLACES = gql`
  mutation getPlaces($city: String!) {
    getPlaces(city: $city) {
      xid
      name
      rate
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
      wikipedia_extracts {
        title
        text
        html
      }
      preview {
        source
      }
    }
}`;

export const GET_SINGLE_PLACE = gql`
mutation getPlace($xid: ID!) {
  getPlace(xid: $xid) {
    xid
    name
    image
    rate
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
    wikipedia_extracts {
      html
      text
      title
    }
    preview {
      source
    }
  }
}
`;

// export const SAVE_API_DATA = gql`
//   mutation SaveApiData($userId: ID!, $apiData: String!) {
//     saveApiData(userId: $userId, apiData: $apiData) {
//       _id
//       username
//       email
//       apiData
//     }
//   }
// `;


