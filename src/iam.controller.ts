import {
  Body,
  ConflictException,
  Controller,
  Optional,
  Post,
  UsePipes,
} from '@nestjs/common';
import { SignupDTO, signupSchema } from './signup.dto';
import { ZodValidationPipe } from './zod-validation.pipe';
import { User } from './user';

@Controller('iam')
export class IAMController {
  constructor(
    @Optional()
    private readonly users: User[] = [],
  ) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  signup(@Body() signupDTO: SignupDTO) {
    if (this.isEmailTaken(signupDTO.email)) {
      throw new ConflictException('email already taken');
    }

    this.createUser(signupDTO);

    return {
      accessToken: 'some-access-token',
    };
  }

  private isEmailTaken(email: string) {
    return this.users.some((user) => user.email === email);
  }

  private createUser(signupDTO: SignupDTO) {
    const user: User = {
      id: this.getNextId(),
      email: signupDTO.email,
    };

    this.users.push(user);
  }

  private getNextId() {
    return this.users.length + 1;
  }
}
