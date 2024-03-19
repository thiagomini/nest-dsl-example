import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SignupDTO, signupSchema } from './signup.dto';
import { ZodValidationPipe } from './zod-validation.pipe';

@Controller('iam')
export class IAMController {
  @Post('signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  signup(@Body() signupDTO: SignupDTO) {
    return {
      accessToken: 'some-access-token',
    };
  }
}
