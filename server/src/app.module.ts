import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UserService } from './services/user.service';
import { PrismaService } from './services/prisma.service';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { AuthController } from './controllers/auth.controller';
import { CourseController } from './controllers/course.controllers';
import { CourseService } from './services/course.service';
import { AssignmentController } from './controllers/assignment.controller';
import { AssignmentService } from './services/assignment.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    CourseController,
    AssignmentController,
  ],
  providers: [
    AssignmentService,
    UserService,
    CourseService,
    PrismaService,
    FirebaseAuthStrategy,
  ],
})
export class AppModule {}
