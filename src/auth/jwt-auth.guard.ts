
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Vui lòng cung cấp access token',
      );
    }

    const token = authorization.substring(7);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'TH2_SECRET_KEY',
      });

      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException(
        'Token không hợp lệ hoặc đã hết hạn',
      );
    }
  }
}