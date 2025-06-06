import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Student extends Document {
   @Prop({ required: true })
  declare id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  major: string;

//   @Prop({ required: true })
//   GPA: number;

//   @Prop({ required: true })
//   subjects: { name: string, score: number }[]; 
}

export const StudentSchema = SchemaFactory.createForClass(Student);