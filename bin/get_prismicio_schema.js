const { buildClientSchema, printSchema } = require('graphql');
const fs = require('fs');

const { PrismicLink } = require('apollo-link-prismic');
const { gql, ApolloClient, InMemoryCache } = require('apollo-boost');

const prismicReposistory = 'michinoeki';
const ouputFile = './prismic.graphql';

const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: `https://${prismicReposistory}.prismic.io/graphql`,
  }),
  cache: new InMemoryCache(),
});

// Query taken from Insomnia API client
const introspectionQuery = gql`
  query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }
  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

apolloClient
  .query({ query: introspectionQuery })
  .then(({ data }) => {
    const graphqlSchemaObj = buildClientSchema(data);
    const sdlString = printSchema(graphqlSchemaObj);

    fs.writeFile(ouputFile, sdlString, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  })
  .catch((error) => {
    console.error(error);
  });
