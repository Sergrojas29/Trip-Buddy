const { User, Place } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ApolloError } = require('apollo-server-errors');

//Query: user, users, places, place
//Mutations: addUser, login, savePlace, removePlace
const apiKey = '5ae2e3f221c38a28845f05b692698d7c9862f1d763b5481bca8939dd';
const resolvers = {
  Query: {
    users: async () => {
      try {
        return User.find().populate('places');
      } catch (error) {
        throw new ApolloError(
          'An error occurred while fetching users.',
          'DATABASE_ERROR',
          {
            error,
          }
        );
      }
    },
    user: async (parent, { username }) => {
      try {
        return User.findOne({ username }).populate('places');
      } catch (error) {
        throw new ApolloError(
          'An error occurred while fetching users.',
          'DATABASE_ERROR',
          {
            error,
          }
        );
      }
    },
    getPlaces: async (parent, { lon, lat }) => {
      try {
        const response = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&src_geom=wikidata&apikey=${apiKey}`
        );
        if (!response.ok) {
          throw new ApolloError(
            'Failed to fetch from external API',
            'API_ERROR',
            {
              statusCode: response.status,
              statusText: response.statusText,
            }
          );
        }

        //Wait for the data

        const data = await response.json();

     
        return data;
      } catch (error) {
        throw new ApolloError(
          'An error occurred while fetching places',
          'DATABASE_ERROR',
          {
            error,
          }
        );
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        if (error.code === 11000) {
          throw new UserInputError('Username or email already exists.', {
            inputArgs: { username, email },
          });
        }
        throw new ApolloError(
          'An error occurred while adding a user.',
          'DATABASE_ERROR',
          {
            error,
          }
        );
      }
    },

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Incorrect email or password');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect email or password');
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        throw new ApolloError(
          'An error occurred during login.',
          'AUTHENTICATION_ERROR',
          {
            error,
          }
        );
      }
    },

    savePlace: async (parent, { place }, context) => {
      if (context.user) {
        try {
          return User.findOneAndUpdate(
            { _id: userId },
            {
              $addToSet: { savedPlaces: place },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        } catch (error) {
          throw new ApolloError(
            'An error occurred while saving a place.',
            'DATABASE_ERROR',
            {
              error,
            }
          );
        }
      }
    },
    removePlace: async (parent, { xid }, context) => {
      if (context.user) {
        try {
          return User.findOneAndUpdate(
            { _id: userId },
            {
              $pull: { savedPlaces: xid },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        } catch (error) {
          throw new ApolloError(
            'An error occurred while removing a place.',
            'DATABASE_ERROR',
            {
              error,
            }
          );
        }
      }
    },
  },
};

module.exports = resolvers;
