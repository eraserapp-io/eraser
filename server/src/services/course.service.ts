import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Course, Prisma, User } from '@prisma/client';
import { FullUser, OmittedCourse } from '../types';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createCourse(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({
      data,
    });
  }

  async updateCourse(
    data: Prisma.CourseUpdateInput,
    user: FullUser,
  ): Promise<Course> {
    let courses = user.courses.filter((course) => course.id === data.id);
    if (courses.length <= 0) {
      throw new UnauthorizedException();
    }

    return this.prisma.course.update({
      data,
      where: {
        id: data.id.toString(),
      },
    });
  }

  async listCourses(user: FullUser): Promise<OmittedCourse[]> {
    return user.courses;
  }
}
