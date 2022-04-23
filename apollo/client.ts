import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/pablo4coding/spilt-connect',
  cache: new InMemoryCache(),
});

export default client;
