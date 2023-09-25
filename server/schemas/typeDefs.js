const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    places: [Place]!
  }

  type Place {
    _id: ID
    title: String!
    description: String
    location: String!
    image: String
    link: String
  }

  input PlaceInput {
    title: String!
    description: String
    location: String
    image: String
    link: String
   }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!, username: String): User
    places(username: String): [Place]
    place(placeId: ID): [Place]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    savePlace(userId: ID!, place: PlaceInput!): User  
    removePlace(placeId: ID!): User
  }
`;

module.exports = typeDefs;
