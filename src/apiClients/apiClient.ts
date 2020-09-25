import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import apiConfig from '../config/apiClient';

const client = new ApolloClient({
  link: PrismicLink({
    uri: apiConfig.uri,
  }),
  cache: new InMemoryCache()
});

export default client;
