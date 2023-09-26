import { gql } from '@apollo/client';

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
    _id
    username
    email
    places {
      xid
      name
      location
      lat
      lon
      image
      }
    }
  }
}`;

export const REMOVE_PLACE = gql`
  mutation removePlace($placeId: ID) {
    removePlace(xid: $placeId) {
      _id
      username
      email
      places {
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

export const SAVE_API_DATA = gql`
  mutation SaveApiData($userId: ID!, $apiData: String!) {
    saveApiData(userId: $userId, apiData: $apiData) {
      _id
      username
      email
      apiData
    }
  }
`;
