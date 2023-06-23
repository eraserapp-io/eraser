import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { Course, User } from '@prisma/client';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { OmittedCourse } from '../types';

@Controller('api/courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('')
  @UseGuards(FirebaseAuthGuard)
  async listCourses(@Request() req): Promise<OmittedCourse[]> {
    return this.courseService.listCourses(req.user);
  }

  @Patch('')
  @UseGuards(FirebaseAuthGuard)
  async updateCourse(
    @Body() data: { id: string; name?: string; color?: string },
    @Request() req,
  ): Promise<Course> {
    if (!data.id) {
      throw new UnauthorizedException();
    }
    return this.courseService.updateCourse(data, req.user);
  }

  @Post('')
  @UseGuards(FirebaseAuthGuard)
  async createCourse(
    @Body() data: { name: string; color: string },
    @Request() req,
  ): Promise<Course> {
    console.log('DATA: ', data);
    return this.courseService.createCourse({
      ...data,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    });
  }
}
