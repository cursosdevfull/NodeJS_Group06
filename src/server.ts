/* const http = require('http'); */
import http from 'http';
import fs from 'fs';
import path from 'path';

const callback = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  console.log('Origin request', request.url);
  console.log('Origin method', request.method);
  const url = request.url.trim().toLowerCase();
  const method = request.method.trim().toLowerCase();

  const paths = [
    {
      url: '/home',
      method: 'get',
      execute: (req: http.IncomingMessage, res: http.ServerResponse) => {
        response.setHeader('content-type', 'text/plain');
        response.writeHead(200);
        response.write('Home');
        response.end();
      },
    },
    {
      url: '/users',
      method: 'get',
      execute: (req: http.IncomingMessage, res: http.ServerResponse) => {
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.write("[{username: 'user01'}, {username: 'user02'}]");
        response.end();
      },
    },
    {
      url: '/users',
      method: 'post',
      execute: (req: http.IncomingMessage, res: http.ServerResponse) => {
        response.setHeader('content-type', 'text/plain');
        response.writeHead(200);
        response.write('User inserted');
        response.end();
      },
    },
    {
      url: '/download',
      method: 'get',
      execute: (req: http.IncomingMessage, res: http.ServerResponse) => {
        response.setHeader(
          'content-disposition',
          'attachment;filename=users.csv'
        );
        response.writeHead(200);
        response.write('username,firstname\nuser01,Sergio\nuser02,Javier');
        response.end();
      },
    },
    {
      url: '/pdf',
      method: 'get',
      execute: (req: http.IncomingMessage, res: http.ServerResponse) => {
        const pathFile = path.join(__dirname, '../', 'public/manual.pdf');
        response.setHeader('content-type', 'application/pdf');
        const result = fs.readFileSync(pathFile);
        response.writeHead(200);
        response.write(result);
        response.end();
      },
    },
  ];

  const pathSelected = paths.find(
    (el) => el.url === url && el.method === method
  );
  if (pathSelected) {
    pathSelected.execute(request, response);
  } else {
    response.setHeader('content-type', 'text/plain');
    response.writeHead(404);
    response.write('Path not found');
    response.end();
  }
};

const server: http.Server = http.createServer(callback);

server.listen(3000);
