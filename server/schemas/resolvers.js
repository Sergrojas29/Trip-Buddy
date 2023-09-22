const { User, Place } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ApolloError } = require('apollo-server-errors');

//Query: user, users, places, place
//Mutations: addUser, login, savePlace, removePlace

const resolvers = {
  Query: {
    users: async () => {
      try {
        return User.find().populate('places');
      } catch (error) {
        throw new ApolloError('An error occurred while fetching users.', 'DATABASE_ERROR', {
          error,
        });
      }
    },
    user: async (parent, { username }) => {
      try {
        return User.findOne({ username }).populate('places');
      } catch (error) {
        throw new ApolloError('An error occurred while fetching users.', 'DATABASE_ERROR', {
          error,
        });
      }
    },
    places: async (parent, { username }) => {
      const params = username ? { username } : {};
      try {
        return Place.find(params).sort({ createdAt: -1 });
      } catch (error) {
        throw new ApolloError('An error occurred while fetching users.', 'DATABASE_ERROR', {
          error,
        });
      }
    },
    place: async (parent, { placeId }) => {
      try {
        return Place.findOne({ _id: placeId });
      } catch (error) {
        throw new ApolloError('An error occurred while fetching users.', 'DATABASE_ERROR', {
          error,
        });
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
        throw new ApolloError('An error occurred while adding a user.', 'DATABASE_ERROR', {
          error,
        });
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
        throw new ApolloError('An error occurred during login.', 'AUTHENTICATION_ERROR', {
          error,
        });
      }
    },

    savePlace: async (parent, { userId, place }) => {
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
        throw new ApolloError('An error occurred while saving a place.', 'DATABASE_ERROR', {
          error,
        });
      }
    },
    removePlace: async (parent, { userId, placeId }) => {
      try {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: { savedPlaces: placeId },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } catch (error) {
        throw new ApolloError('An error occurred while removing a place.', 'DATABASE_ERROR', {
          error,
        });
      }
    },
  },
};

module.exports = resolvers;
