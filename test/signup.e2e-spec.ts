import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Signup (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/signup (POST) returns 400 when email is invalid', () => {
    return request(app.getHttpServer())
      .post('/iam/signup')
      .send({
        email: 'invalid-email',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .expect(400);
  });

  test("/signup (POST) returns 400 when password and confirmation don't match", () => {
    return request(app.getHttpServer())
      .post('/iam/signup')
      .send({
        email: 'mail@mail.com',
        password: 'password',
        passwordConfirmation: 'password-different',
      })
      .expect(400);
  });

  test('/signup (POST) returns 201 and access token when email and password are valid', async () => {
    return request(app.getHttpServer())
      .post('/iam/signup')
      .send({
        email: 'mail@mail.com',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body.accessToken).toBeTruthy();
      });
  });
});
