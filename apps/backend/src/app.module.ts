import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeModule } from '@app/node/node.module';
import { PageModule } from '@app/page/page.module';
import { EdgeModule } from '@app/edge/edge.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from '@app/page/page.entity';
import { Edge } from '@app/edge/edge.entity';
import { Node } from '@app/node/node.entity';
import { User } from '@app/user/user.entity';
import { Workspace } from '@app/workspace/workspace.entity';
import { Role } from '@app/role/role.entity';
import * as path from 'path';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from '@app/user/user.module';
import { WorkspaceModule } from '@app/workspace/workspace.module';
import { RoleModule } from '@app/role/role.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LangchainModule } from './langchain/langchain.module';
import { NodeController } from './node/node.controller';
import { PageController } from './page/page.controller';
import { EdgeController } from './edge/edge.controller';
import { WorkspaceController } from './workspace/workspace.controller';
import { TokenModule } from '@app/token/token.module';
import { TokenService } from '@app/token/token.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '..', '.env'), // * nest 디렉터리 기준
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Node, Page, Edge, User, Workspace, Role],
        logging: process.env.NODE_ENV === 'development',
        synchronize: process.env.NODE_ENV === 'development',
      }),
    }),
    NodeModule,
    PageModule,
    EdgeModule,
    UploadModule,
    AuthModule,
    UserModule,
    TokenModule,
    WorkspaceModule,
    RoleModule,
    TasksModule,
    LangchainModule,
  ],
  controllers: [
    AppController,
    NodeController,
    PageController,
    EdgeController,
    WorkspaceController,
  ],
  providers: [AppService, TokenService],
})
export class AppModule {}
