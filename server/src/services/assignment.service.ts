import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Assignment, Course, Prisma } from '@prisma/client';
import { FullUser, OmittedAssignmentWithCoursesOmitted } from '../types';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async createAssignment(
    data: Prisma.AssignmentCreateInput,
  ): Promise<Assignment> {
    return this.prisma.assignment.create({
      data,
    });
  }

  async listAssignments(
    user: FullUser,
  ): Promise<OmittedAssignmentWithCoursesOmitted[]> {
    return user.assignments;
  }

  async deleteAssignment(
    data: {
      id: string;
    },
    user: FullUser,
  ) {
    let assignments = user.assignments.filter(
      (assignment) => assignment.id === data.id,
    );
    if (assignments.length <= 0) {
      throw new UnauthorizedException();
    }

    return this.prisma.assignment.delete({
      where: {
        id: data.id,
      },
    });
  }

  async updateAssignment(data: Prisma.AssignmentUpdateInput, user: FullUser) {
    if (!data.id) {
      throw new UnprocessableEntityException();
    }

    let assignments = user.assignments.filter(
      (assignment) => assignment.id === data.id,
    );
    if (assignments.length <= 0) {
      throw new UnauthorizedException();
    }

    return this.prisma.assignment.update({
      where: {
        id: data.id.toString(),
      },
      data,
    });
  }
}
