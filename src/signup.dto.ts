import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'password and confirmation do not match',
    path: ['passwordConfirmation'],
  });

export type SignupDTO = z.infer<typeof signupSchema>;
