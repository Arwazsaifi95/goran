import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import { IStudent } from 'src/interfaces/student.interface';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel('Student')
        private studentModel: Model<IStudent>,
    ) { }

    async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
        try {
            const newStudent = await new this.studentModel(createStudentDto);
            return newStudent.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getStudents(): Promise<IStudent[]> {
        try {
            const data = await this.studentModel.find()
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async getStudentById(id: string): Promise<IStudent> {
        try {
            const studentData = await this.studentModel.findById(id);
            if (!studentData) {
                throw new Error(`student is not found with this Id ${id}`);
            }
            return studentData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateStudent(id: string, updatedData: object): Promise<IStudent> {
        try {
            const student = await this.studentModel.findByIdAndUpdate(
                id,
                updatedData,
                {
                    new: true,
                },
            );
            if (!student) {
                throw new Error(`student not found with this id ${id}`);
            }
            return student;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteStudentById(id: string): Promise<IStudent> {
        try {
            const student = await this.studentModel.findByIdAndDelete(id);
            if (!student) {
                throw new Error(`student not found with this id ${id}`);
            }
            return student;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getStudentByName(name: string): Promise<IStudent[]> {
        try {
            const regex = new RegExp(name, 'i');
            const student = await this.studentModel.find({
                name: { $regex: regex },
            });
            if (!student) {
                throw new Error('Student not found');
            }
            return student;
        } catch (error) {
            throw error;
        }
    }
}
