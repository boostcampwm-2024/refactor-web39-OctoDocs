import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './workspace.entity';
import { WorkspaceRepository } from './workspace.repository';
import { UserModule } from '@app/user/user.module';
import { RoleModule } from '@app/role/role.module';
import { TokenModule } from '@app/token/token.module';
import { TokenService } from '@app/token/token.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace]),
    UserModule,
    RoleModule,
    TokenModule,
    ConfigModule,
  ],
  providers: [
    WorkspaceService,
    WorkspaceRepository,
    TokenService,
  ],
  exports: [WorkspaceService, WorkspaceRepository],
})
export class WorkspaceModule {}
