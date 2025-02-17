import { Module, forwardRef } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edge } from './edge.entity';
import { EdgeRepository } from './edge.repository';
import { NodeModule } from '@app/node/node.module';
import { WorkspaceModule } from '@app/workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Edge]),
    forwardRef(() => NodeModule),
    WorkspaceModule,
  ],
  providers: [EdgeService, EdgeRepository],
  exports: [EdgeService],
})
export class EdgeModule {}
