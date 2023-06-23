import { Assignment, Course, User } from '@prisma/client';

export type FullUser = {
  id: string;
  email: string;
  name: string;
  assignments: OmittedAssignmentWithCoursesOmitted[];
  courses: OmittedCourse[];
};

export type OmittedUser = {
  id: string;
  email: string;
  name: string;
};

export type OmittedAssignmentWithCoursesOmitted = {
  id: string;
  course: OmittedCourse;
  completed: boolean;
  title: string;
  description: string;
  dueDate: Date;
};

export type OmittedCourse = {
  id: string;
  name: string;
  color: string;
};

export type FullUserWithAllParams = User & {
  assignments: (Assignment & { course: Course })[];
  courses: Course[];
};
