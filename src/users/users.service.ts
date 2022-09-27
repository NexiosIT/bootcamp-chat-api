import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'jasper',
      password: 'nexios',
    },
    {
      id: 2,
      username: 'test',
      password: 'demo',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
