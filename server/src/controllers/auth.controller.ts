import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User as UserModel } from '@prisma/client';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async registerUser(
    @Body() userData: { id: string; name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
