const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ApolloError } = require('apollo-server-errors');
const fetch = require('node-fetch')
//Query: user, users, getPlaces, getPlace
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

        //Simplifiy it for the fields we care about
        const features = data.features

        const placeData = features.map(feature => feature.properties)


        console.log(placeData)


        return placeData;
      } catch (error) {
        console.error(error)
        throw new ApolloError(
          'An error occurred while fetching places',
          'DATABASE_ERROR',
          {
            error,
          }
        );
      }
    },
    getPlace: async (parent, { xid }, context) => {
      if (!context.user) {
        try {
          const response = await fetch(
            `http://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`
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

          //Simplifiy it for the fields we care about

          console.log(data)

          return data;
        } catch (error) {
          console.error(error)
          throw new ApolloError(
            'An error occurred while fetching places',
            'DATABASE_ERROR',
            {
              error,
            }
          );
        }
      }
    }
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
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id }, // Use context.user._id
            {
              $addToSet: { savedPlaces: place },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          return updatedUser;
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
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id }, // Use context.user._id
            {
              $pull: { savedPlaces: xid },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          return updatedUser;
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
