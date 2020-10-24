import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(StudentRepository)
        private readonly studentRepository: StudentRepository
    ) { }

    async getStudents (): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async getStudentById (id: string): Promise<Student> {
        return await this.studentRepository.findOne({ id });
    }

    async createStudent (createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInput;

        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        });

        return this.studentRepository.save(student);
    }

    async getManyStudents (studentsId: string[]): Promise<Student[]> {
        return await this.studentRepository.find({
            where: {
                id: {
                    $in: studentsId
                }
            }
        });
    }

}
