import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator((ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest().user as User;

  return user;
});
