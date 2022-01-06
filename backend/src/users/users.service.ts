import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Parser } from 'json2csv';
// import { from, Observable } from 'rxjs';
// import { map } from 'rxjs/internal/operators/map';
// import { User } from 'src/models/user.model';
import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { HelperFunctions } from 'src/utils/helperFunctions';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repo,
    private helperFunctions: HelperFunctions,
  ) {
    super(repo);
  }

  async findByUsername(username: string) {
    return await getRepository(UserEntity).findOne({
      where: {
        username: username,
      },
    });
  }

  async findById(userId: number) {
    return await getRepository(UserEntity).findOne({
      where: { id: userId },
    });
  }

  async softDeleteUser(id: number) {
    const userToDelete = await this.repo.findOne(id);
    console.log(userToDelete);
    if (userToDelete) {
      return await this.repo.softDelete(userToDelete);
    }
  }
}
