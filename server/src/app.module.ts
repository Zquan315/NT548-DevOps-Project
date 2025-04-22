import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://quantc:31012004@nt548-devops.68ujgah.mongodb.net/'),
    StudentsModule,
  ],
})
export class AppModule {}