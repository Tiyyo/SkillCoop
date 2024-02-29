import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class DeleteAccountGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;
    if (request.user !== userId) {
      throw new ForbiddenException('Forbidden');
    }
    return true;
  }
}
