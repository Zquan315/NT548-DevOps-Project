import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findOne({ id }).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const updatedStudent = await this.studentModel.findOneAndUpdate({ id }, updateStudentDto, { new: true }).exec();
    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return updatedStudent;
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentModel.findOneAndDelete({ id }).exec();
    if (!result) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }

  async addSubject(id: string, subjectData: { name: string; score: number }): Promise<Student> {
    const student = await this.studentModel.findOne({ id });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    
    // Thêm môn học vào mảng subjects
    student.subjects.push(subjectData);

    // Tính lại GPA sau khi thêm môn học mới
    const totalScore = student.subjects.reduce((sum, subject) => sum + subject.score, 0);
    const GPA = totalScore / student.subjects.length;

    // Cập nhật lại GPA
    student.GPA = GPA;

    // Lưu lại sinh viên với thông tin mới
    await student.save();
    return student;
  }
}
