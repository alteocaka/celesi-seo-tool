import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
