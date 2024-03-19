import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { DSL, dsl as createDSL } from './dsl/dsl';

describe('Signup (e2e)', () => {
  let app: INestApplication;
  let dsl: DSL;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dsl = createDSL(app);
  });

  afterEach(async () => {
    await app.close();
  });

  test('/signup (POST) returns 400 when email is invalid', async () => {
    const response = await dsl.iam.signup({
      email: 'invalid-email',
      password: 'password',
      passwordConfirmation: 'password',
    });

    dsl.iam.assert(response).toBeBadRequest();
  });

  test("/signup (POST) returns 400 when password and confirmation don't match", async () => {
    const response = await dsl.iam.signup({
      email: 'mail@mail.com',
      password: 'password',
      passwordConfirmation: 'password-different',
    });

    dsl.iam.assert(response).toBeBadRequest();
  });

  test('/signup (POST) returns 201 and access token when email and password are valid', async () => {
    const response = await dsl.iam.signup({
      email: 'mail@mail.com',
      password: 'password',
      passwordConfirmation: 'password',
    });

    dsl.iam.assert(response).toBeUserSignedUpSuccessfully();
  });

  test('/signup (POST) returns 409 when email is in use', async () => {
    await dsl.iam.signup({
      email: 'mail@mail.com',
      password: 'password',
      passwordConfirmation: 'password',
    });

    const response = await dsl.iam.signup({
      email: 'mail@mail.com',
      password: 'password',
      passwordConfirmation: 'password',
    });

    dsl.iam.assert(response).toBeUserExistsConflict();
  });
});
