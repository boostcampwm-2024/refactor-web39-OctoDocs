import { Module, forwardRef } from '@nestjs/common';
import { PageService } from './page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { PageRepository } from './page.repository';
import { NodeModule } from '@app/node/node.module';
import { WorkspaceModule } from '@app/workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Page]),
    forwardRef(() => NodeModule),
    WorkspaceModule,
  ],
  providers: [PageService, PageRepository],
  exports: [PageService, PageRepository],
})
export class PageModule {}
