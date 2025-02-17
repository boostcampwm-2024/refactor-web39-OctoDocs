import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequiredException } from '@app/exception/login.exception';
import { InvalidTokenException } from '@app/exception/invalid.exception';
import { TokenExpiredError } from 'jsonwebtoken';
import { TokenService } from '@app/token/token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const cookies = request.cookies; // 쿠키에서 가져오기

    // 쿠키가 아예 없는 경우는 로그인 안 된 상태로 간주
    if (!cookies || !cookies.accessToken || !cookies.refreshToken) {
      // 관련된 쿠키 비워주기
      this.tokenService.clearCookies(response);
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
          this.tokenService.setAccessTokenCookie(response, newAccessToken);

          // 요청 객체에 사용자 정보 추가
          const decodedNewToken = this.jwtService.verify(newAccessToken, {
            secret: process.env.JWT_SECRET,
          });
          request.user = decodedNewToken;

          return true;
        } catch (refreshError) {
          // refreshToken 디코딩 실패 시 처리 쿠키 비워줌
          this.tokenService.clearCookies(response);
          throw new InvalidTokenException();
        }
      } else {
        // accessToken 디코딩(만료가 아닌 이유로) 실패 시 처리 쿠키 비워줌
        this.tokenService.clearCookies(response);
        throw new InvalidTokenException();
      }
    }
  }

  // 제대로 로그인이 안되어있으면 exception 대신 false return
  // 쿠키 처리해줌
  async isLoggedIn(request, response): Promise<boolean> {
    const cookies = request.cookies;

    // 쿠키가 없는 경우 false 반환
    if (!cookies || !cookies.accessToken || !cookies.refreshToken) {
      return false;
    }

    const { accessToken, refreshToken } = cookies;

    try {
      // JWT 검증
      this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      return true;
    } catch (error) {
      // accessToken이 만료된 경우
      if (error instanceof TokenExpiredError) {
        try {
          // 새로운 accessToken 발급받기
          const newAccessToken =
            await this.tokenService.refreshAccessToken(refreshToken);

          // 쿠키 업데이트
          this.tokenService.setAccessTokenCookie(response, newAccessToken);

          return true;
        } catch (refreshError) {
          // refreshToken 디코딩 실패 시 처리 쿠키 비워줌
          this.tokenService.clearCookies(response);
          return false;
        }
      } else {
        // accessToken 디코딩(만료가 아닌 이유로) 실패 시 처리 쿠키 비워줌
        this.tokenService.clearCookies(response);
        return false;
      }
    }
  }
}
