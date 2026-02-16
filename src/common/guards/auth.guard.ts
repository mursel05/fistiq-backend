import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenService } from 'src/modules/auth/token.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: {
    id: number;
    isAdmin?: boolean;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext<{ req: RequestWithUser }>();

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      if (isPublic) {
        return true;
      }
      this.logger.warn(`Unauthorized access attempt: No authorization header`);
      throw new UnauthorizedException('Session has expired.');
    }

    const [bearer, access_token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !access_token) {
      if (isPublic) {
        return true;
      }
      this.logger.warn(
        `Unauthorized access attempt: Invalid authorization format`,
      );
      throw new UnauthorizedException('Session has expired.');
    }

    const payload = this.tokenService.validateAccessToken(access_token);

    if (!payload) {
      if (isPublic) {
        return true;
      }
      this.logger.warn(`Unauthorized access attempt: Invalid or expired token`);
      throw new UnauthorizedException('Session has expired.');
    }

    req.user = {
      id: payload.sub,
    };

    return true;
  }
}
