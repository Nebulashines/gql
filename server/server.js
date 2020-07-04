const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const path = require("path");
require("dotenv").config();

const mongoose = require("mongoose");
const DB = process.env.DATABASE_CLOUD;

//DATABASE CONNECTION
const db = async () => {
  try {
    const success = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongo DB connected");
  } catch (error) {
    console.error("DB Connection Error", error);
  }
};

//EXECUTE DB connection
db();

const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require("merge-graphql-schemas");

const app = express();
const port = process.env.PORT;

//merge typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./typeDefs")));

//merge resolvers
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

//resolvers

//graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// apply middleware method connects ApolloServer to a specific HTTP framework i.e express

apolloServer.applyMiddleware({
  app,
});

//const httpServer = http.createServer(app);

app.get("/rest", (req, res) => {
  res.json({
    data: "You hit the rest endpoint",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(
    `GraphQl Server is ready on port ${port} at ${apolloServer.graphqlPath}`
  );
});
