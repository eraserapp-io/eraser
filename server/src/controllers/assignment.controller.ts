import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Assignment, Course } from '@prisma/client';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { AssignmentService } from '../services/assignment.service';
import { OmittedAssignmentWithCoursesOmitted } from '../types';

@Controller('api/assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get('')
  @UseGuards(FirebaseAuthGuard)
  async listAssignments(
    @Request() req,
  ): Promise<OmittedAssignmentWithCoursesOmitted[]> {
    return this.assignmentService.listAssignments(req.user);
  }

  @Post('')
  @UseGuards(FirebaseAuthGuard)
  async createAssignment(
    @Body()
    data: {
      title: string;
      course: Course;
      description?: string;
      dueDate: Date;
    },
    @Request() req,
  ) {
    return this.assignmentService.createAssignment({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      user: {
        connect: {
          id: req.user.id,
        },
      },
      course: {
        connect: {
          id: data.course.id,
        },
      },
    });
  }

  @Patch('')
  @UseGuards(FirebaseAuthGuard)
  async updateAssignment(
    @Body()
    data: {
      id: string;
      title: string;
      course: Course;
      description?: string;
      dueDate: Date;
      completed: boolean;
    },
    @Request() req,
  ) {
    return this.assignmentService.updateAssignment(
      {
        id: data.id,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        completed: data.completed,
        course: {
          connect: {
            id: data.course.id,
          },
        },
      },
      req.user,
    );
  }

  @Delete('')
  @UseGuards(FirebaseAuthGuard)
  async deleteAssignment(
    @Body()
    data: {
      id: string;
    },
    @Request() req,
  ) {
    return this.assignmentService.deleteAssignment(data, req.user);
  }
}
