const development = {
  mongodb: {
    database: "development",
    uri: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@keencoding.dptc2.mongodb.net/development?retryWrites=true&w=majority`,
  },
};

const production = {
  mongodb: {
    database: "development",
    uri: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@keencoding.dptc2.mongodb.net/development?retryWrites=true&w=majority`,
  },
};

const config = {
  development,
  production,
};

export default config[process.env.NODE_ENV];
