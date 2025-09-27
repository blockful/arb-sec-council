import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { config } from './config';

const httpLink = new HttpLink({
  uri: config.ponder.graphqlUrl,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      pollInterval: 10000, // Poll every 10 seconds for real-time updates
    },
  },
});