const typeDefs = `

  input AddressInput {
    road: String
    house: String
    state: String
    suburb: String
    country: String
    postcode: String
    country_code: String
    house_number: String
    state_district: String
  }


  input PlaceInput {
    xid: String
    name: String
    address: AddressInput

    image: String
  }

  type Address {
    road: String
    house: String
    state: String
    suburb: String
    country: String
    postcode: String
    country_code: String
    house_number: String
    state_district: String
  }
  


  type Place {
    xid: String
    name: String
    address: Address
    rate: Int
    image: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    places: [Place]
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!, username: String): User
    
   
  }

  type Mutation {
    getPlaces(city: String!): [Place]
    getPlace(xid: ID!): Place
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    savePlace(place: PlaceInput!): User  
    removePlace(xid: ID!): User
  }
`;

module.exports = typeDefs;