// import { Module } from "@nestjs/common";
// import { JwtModule } from "@nestjs/jwt";
// import { TokenService } from "./token.service";
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { UserModule } from "@app/user/user.module";

// @Module({
//   imports: [
//     UserModule,
//     ConfigModule, // ConfigModule 등록
//     JwtModule.registerAsync({
//       imports: [ConfigModule], // ConfigModule에서 환경 변수 로드
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         console.log("hello!!!!!!");
//         // console.log(configService.get<string>("JWT_SECRET"));
//         return {
//           secret: configService.get<string>("JWT_SECRET"), // JWT_SECRET 가져오기
//         };
//       },
//     }),
//   ],
//   providers: [TokenService],
//   exports: [TokenService, JwtModule],
// })
// export class TokenModule {
//   constructor() {
//     console.log("token");
//   }
// }
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "./token.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "@app/user/user.module";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => {
        console.log("hello!!!!!!");
        // console.log(configService.get<string>("JWT_SECRET"));
        return {
          secret: "hello",
        };
      },
    }),
  ],
  providers: [TokenService],
  exports: [TokenService, JwtModule],
})
export class TokenModule {
  constructor() {
    console.log("token");
  }
}
