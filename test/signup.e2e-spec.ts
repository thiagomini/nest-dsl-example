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
});
