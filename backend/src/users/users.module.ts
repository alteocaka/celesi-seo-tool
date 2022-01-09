import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/';

import { UserEntity } from './user.entity';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { HelperFunctions } from 'src/utils/helperFunctions';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserRepository,
    ]),
  ],
  providers: [UserService, HelperFunctions],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
