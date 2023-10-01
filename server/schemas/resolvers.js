const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ApolloError } = require('apollo-server-errors');
const fetch = require('node-fetch')

//Query: user, users, 

//Mutations: addUser, login, savePlace, removePlace, getPlaces, getPlace
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
  
    me: async (parent, args, context) => {
      if (context.user) {
        console.log('User info being request')
        return User.findOne({_id: context.user._id}).populate('savedPlaces')
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
        if (error) {
          throw new Error(error, {
            inputArgs: { username, email },
          });
        }
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
        console.log('Incoming Save Request')
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
          )
        
        }
      }
    },

    removePlace: async (parent, { xid }, context) => {
      if (context.user) {
        console.log('Incoming Remove Request')
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id }, // Use context.user._id
            {
              $pull: { savedPlaces: {xid} },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          return updatedUser;
        } catch (error) {
          throw new Error(error);
        }
      }
    },



    getPlaces: async (parent, { city }) => {
      console.log('Incoming request for nearby places')
      try {
        // Replace spaces in the city name with '+' for the URL
        const typedCity = city.replace(' ', '+');

        // Fetch geolocation data for the city
        const cityData = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${typedCity}&count=10&language=en&format=json`
        );

        if (!cityData.ok) {
          throw new ApolloError(
            'Failed to fetch city geolocation data from external API',
            'API_ERROR',
            {
              statusCode: cityData.status,
              statusText: cityData.statusText,
            }
          );
        }

        // Wait for the data
        const cityInfo = await cityData.json();

        // Check if the city was found
        if (!cityInfo.results || cityInfo.results.length === 0) {
          throw new ApolloError('City not found', 'DATA_NOT_FOUND');
        }

        // Extract the coordinates (latitude and longitude) of the first result
        const lon = cityInfo.results[0].longitude;
        const lat = cityInfo.results[0].latitude;

        // Fetch places based on the coordinates
        const response = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&src_attr=wikidata&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new ApolloError(
            'Failed to fetch places from external API',
            'API_ERROR',
            {
              statusCode: response.status,
              statusText: response.statusText,
            }
          );
        }

        // Wait for the data
        const data = await response.json();

        // Simplify it for the fields we care about
        const features = data.features;
        const placeData = features.map((feature) => feature.properties);

       

        return placeData;
      } catch (error) {

        console.error(error);
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
      
        console.log('Incoming request for single place info')
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
}
module.exports = resolvers;
