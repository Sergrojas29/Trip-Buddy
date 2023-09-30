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

  input Wikipedia_extractsInput {
    title: String
    text: String
    html: String
  }

  input PreviewInput {
    source: String
  }


  input PlaceInput {
    xid: String
    name: String
    address: AddressInput
    wikipedia_extracts: Wikipedia_extractsInput
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
  
  type Wikipedia_extracts {
    title: String
    text: String
    html: String
  }


  type Preview {
    source: String
  }


  type Place {
    xid: String
    name: String
    rate: Int
    address: Address
    image: String
    wikipedia_extracts: Wikipedia_extracts
    preview: Preview 
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
    me: User
  }

  type Query {
    users: [User]!
    user(username: String): User
    me: User
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