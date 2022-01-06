import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/user.interface';

export const ROLE_KEY = 'roles';

export const WithRole = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
