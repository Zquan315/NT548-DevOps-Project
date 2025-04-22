import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017'),
    StudentsModule,
  ],
})
export class AppModule {}