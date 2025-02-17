import { Module, forwardRef } from '@nestjs/common';
import { NodeService } from './node.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './node.entity';
import { NodeRepository } from './node.repository';
import { PageModule } from '@app/page/page.module';
import { WorkspaceModule } from '@app/workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Node]),
    forwardRef(() => PageModule),
    WorkspaceModule,
  ],
  providers: [NodeService, NodeRepository],
  exports: [NodeService, NodeRepository],
})
export class NodeModule {}
