import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';

export class AdminGuard implements CanActivate {
  // context is like a request but not necessarily HTTP request so it's called context
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.currentUser;
    if (!currentUser) {
      return false;
    }
    return currentUser.isAdmin;
  }
}
