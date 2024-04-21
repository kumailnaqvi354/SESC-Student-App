import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.NEST_PUBLIC_MONGODB_URI), StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
