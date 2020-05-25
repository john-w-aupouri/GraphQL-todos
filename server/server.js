const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

// Schema
let todos = [
  {
    id: 0,
    text: 'Front end routes and layout',
    completed: true,
  },
  {
    id: 1,
    text: 'Impement React-Content-API for state-management',
    completed: true,
  },
  {
    id: 2,
    text: 'Implement local storage and form validation',
    completed: false,
  },
  {
    id: 3,
    text: 'Set up MongoDB',
    completed: true,
  },
  {
    id: 4,
    text: 'Back end routes',
    completed: true,
  },
  {
    id: 5,
    text: 'Connect client and server',
    completed: false,
  },
  {
    id: 6,
    text: 'Implement User Authentication',
    completed: false,
  },
];

const typeDefs = gql`
  type Todo {
    id: String
    text: String
    completed: Boolean
  }
  type Query {
    todos: [Todo]!
  }
  type Mutation {
    createTodo(text: String!):String
    removeTodo(id: String!):String
    updateTodo(id: String!):String
  }
`;

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createTodo: (parent, args, context, info) => {

      return todos.push({
        id: Date.now().toString(),
        text: args.text,
        completed: false,
      });
    },
    removeTodo: (parent, args, context, info) => {
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos.splice(i, 1);
        }
      }
      return args.id;
    },
    updateTodo: (parent, args, context, info) => {
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos[i].completed = !todos[i].completed;
        }
      }
      return args.id;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
