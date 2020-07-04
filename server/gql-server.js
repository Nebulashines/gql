const { ApolloServer } = require("apollo-server");
require("dotenv").config();

const port = process.env.PORT;

//types query /mutation /subscription
const typeDefs = `
type Query {
    totalPosts: Int!
}
`;

//resolvers
const resolvers = {
  Query: {
    totalPosts: () => {
      return 42;
    },
  },
};

//graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.listen(port, () => {
  console.log(`Graphql server is listening on port ${port}`);
});
