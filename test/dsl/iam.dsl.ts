import { INestApplication } from '@nestjs/common';
import { SignupDTO } from 'src/signup.dto';
import * as request from 'supertest';

export function iam(app: INestApplication) {
  return Object.freeze({
    signup(data: SignupDTO) {
      return request(app.getHttpServer()).post('/iam/signup').send(data);
    },
  });
}
