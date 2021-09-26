import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Hola Mundo' }));
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(3000, () => console.log('Server is running on port 3000'));
