import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      places {
        xid: String
        name: String
        address: Address
        image: String
        wikipedia_extracts: Wikipedia_extracts
        preview: Preview 
      }
    }
  }
`;
