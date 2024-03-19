import { BadRequestException, Controller, Post } from '@nestjs/common';

@Controller('iam')
export class IAMController {
  @Post('signup')
  signup() {
    throw new BadRequestException();
  }
}
