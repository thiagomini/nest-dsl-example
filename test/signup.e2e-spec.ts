import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { dsl } from './dsl/dsl';

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
    return dsl(app)
      .iam.signup({
        email: 'invalid-email',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .expect(400);
  });

  test("/signup (POST) returns 400 when password and confirmation don't match", () => {
    return dsl(app)
      .iam.signup({
        email: 'mail@mail.com',
        password: 'password',
        passwordConfirmation: 'password-different',
      })
      .expect(400);
  });

  test('/signup (POST) returns 201 and access token when email and password are valid', async () => {
    return dsl(app)
      .iam.signup({
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

  test('/signup (POST) returns 409 when email is in use', async () => {
    await dsl(app).iam.signup({
      email: 'mail@mail.com',
      password: 'password',
      passwordConfirmation: 'password',
    });

    return dsl(app)
      .iam.signup({
        email: 'mail@mail.com',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .expect(409);
  });
});
