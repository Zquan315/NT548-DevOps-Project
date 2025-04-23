import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://quantc:31012004@nt548-devops.68ujgah.mongodb.net/NT548-DevOps-DB?retryWrites=true&w=majority'),
    StudentsModule,
  ],
})
export class AppModule {}