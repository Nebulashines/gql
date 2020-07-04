// const { gql } = require("apollo-server-express");
const { posts } = require("../temp");

//queries
const totalPosts = () => posts.length;
const allPosts = () => posts;

//mutation
const newPost = (_, args, context) => {
  //const { title, description } = args.input; //destructuring works
  //create a new post object
  const post = {
    id: posts.length + 1,
    ...args.input, //spread operator works also!
  };

  //push new post object to posts array
  posts.push(post);

  return post;
};
module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
