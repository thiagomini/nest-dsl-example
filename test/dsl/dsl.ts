import { INestApplication } from '@nestjs/common';
import { iam } from './iam.dsl';

export const dsl = (app: INestApplication) =>
  Object.freeze({
    iam: iam(app),
  });
