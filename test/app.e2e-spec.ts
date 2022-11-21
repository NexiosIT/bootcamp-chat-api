import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Create user', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create user success', async () => {
    const user = {
      username: 'testapp',
      email: 'test@nexiosit.com',
      password: 'test',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    console.log(response);
    expect(response.status).toEqual(201);
  });
});
