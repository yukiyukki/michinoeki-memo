interface APIConfig {
  uri: string;
}

class Configuration {
  constructor(private config: APIConfig) { }

  get uri() {
    return this.config.uri;
  }
}

export default new Configuration({
  uri: process.env.GQL_URI || 'GraphQL URI not found',
});