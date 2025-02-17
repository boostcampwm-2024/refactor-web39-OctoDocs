import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { UserRepository } from '@app/user/user.repository';
import { WorkspaceRepository } from '@app/workspace/workspace.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly userRepository: UserRepository,
  ) {}
}
