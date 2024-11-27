import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequiredException } from '../../exception/login.exception';
import { InvalidTokenException } from '../../exception/invalid.exception';
import { TokenExpiredError } from 'jsonwebtoken';
import { TokenService } from '../token/token.service';
import { Response } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();

    const cookies = request.cookies; // 쿠키에서 가져오기

    // 쿠키가 아예 없는 경우는 로그인 안 된 상태로 간주
    if (!cookies || !cookies.accessToken || !cookies.refreshToken) {
      throw new LoginRequiredException();
    }

    const { accessToken, refreshToken } = cookies;

    try {
      // JWT 검증
      const decodedToken = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      // 유효한 토큰이면 요청 객체에 사용자 정보를 추가
      request.user = decodedToken;
      return true;
    } catch (error) {
      // accessToken이 만료된 경우
      if (error instanceof TokenExpiredError) {
        try {
          // 새로운 accessToken 발급받기
          const newAccessToken =
            await this.tokenService.refreshAccessToken(refreshToken);

          // 쿠키 업데이트
          response.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1시간 (ms 단위)
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1시간 후 (Date 객체로 설정)
          });

          // 요청 객체에 사용자 정보 추가
          const decodedNewToken = this.jwtService.verify(newAccessToken, {
            secret: process.env.JWT_SECRET,
          });
          request.user = decodedNewToken;

          return true;
        } catch (refreshError) {
          throw new InvalidTokenException();
        }
      } else {
        throw new InvalidTokenException();
      }
    }
  }
}
