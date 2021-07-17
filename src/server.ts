/* const http = require('http'); */
import http from 'http';
import fs from 'fs';
import path from 'path';
import express, { Application } from 'express';

const app: Application = express();

app.get('/users', (req, res) => {
  const users = [
    {
      username: 'user01',
    },
    { username: 'user02' },
  ];

  res.json(users);

  //res.setHeader('content-type', 'application/json');
  // res.writeHead(200);
  //res.statusCode = 200;
  //res.write(JSON.stringify(users));
  //res.end();
});

app.post('/users', (req, res) => {
  res.status(201).send('User inserted');
});

const server = http.createServer(app);
server.listen(3000, () => console.log('Server is running on port 3000'));
// app.listen(3000, () => console.log('Server is running on port 3000'));
