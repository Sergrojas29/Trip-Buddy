import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedPlaces {
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
    }
  }
`;
