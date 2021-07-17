import { Request, Response } from 'express';

export class UserController {
  list(request: Request, response: Response) {
    const users = [
      {
        username: 'user01',
      },
      { username: 'user02' },
    ];

    response.json(users);
  }

  insert(request: Request, response: Response) {
    response.status(201).send('User inserted');
  }
}
