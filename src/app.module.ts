import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IAMController } from './iam.controller';

@Module({
  imports: [],
  controllers: [AppController, IAMController],
  providers: [AppService],
})
export class AppModule {}
