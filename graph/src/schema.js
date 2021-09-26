import { makeExecutableSchema } from '@graphql-tools/schema';
import { tasks } from './tasks.js';

const resolvers = {
  Query: {
    hola: () => 'Hola mundo',
    saludo: () => 10,
    saludar: (root, { nombre }) => 'Buen día ' + nombre,
    tasks: () => tasks,
  },
  Mutation: {
    createTask: (_, { input }) => {
      input._id = tasks.length;
      input.number = input.number || 10;

      tasks.push(input);
      return input;
    },
  },
};

const typeDefs = `
    type Query {
        hola: String
        saludo: Int
        saludar(nombre: String!): String
        tasks: [Task]
    }

    type Mutation {
        createTask(input: TaskInput): Task
    }

    input TaskInput {
        title: String!
        description: String!
        number: Int       
    }

    type Task {
        _id:  ID
        title: String!
        description: String!
        number: Int
    }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
