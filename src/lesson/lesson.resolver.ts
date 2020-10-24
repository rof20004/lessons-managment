import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Student } from "src/student/student.entity";
import { StudentService } from "../student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private readonly lessonService: LessonService,
        private readonly studentService: StudentService
    ) { }

    @Query(returns => [LessonType])
    async lessons (): Promise<Lesson[]> {
        return await this.lessonService.getLessons();
    }

    @Query(returns => LessonType)
    async lesson (@Args('id') id: string): Promise<Lesson> {
        return await this.lessonService.getLessonById(id);
    }

    @Mutation(returns => LessonType)
    async createLesson (@Args('createLessonInput') createLessonInput: CreateLessonInput): Promise<Lesson> {
        return await this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    async assignStudentsToLesson (@Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput) {
        return await this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput);
    }

    @ResolveField()
    async students (@Parent() lesson: Lesson): Promise<Student[]> {
        return await this.studentService.getManyStudents(lesson.students);
    }

}