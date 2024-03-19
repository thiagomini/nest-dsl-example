import { INestApplication } from '@nestjs/common';
import { SignupDTO } from 'src/signup.dto';
import * as request from 'supertest';

export function iam(app: INestApplication) {
  return Object.freeze({
    async signup(data: SignupDTO) {
      return await request(app.getHttpServer()).post('/iam/signup').send(data);
    },
    assert,
  });
}

function assert(response: request.Response) {
  return Object.freeze({
    toBeUserSignedUpSuccessfully() {
      expect(response.status).toBe(201);
      expect(response.body.accessToken).toBeTruthy();
    },
    toBeBadRequest() {
      expect(response.status).toBe(400);
    },
    toBeUserExistsConflict() {
      expect(response.status).toBe(409);
    },
  });
}
