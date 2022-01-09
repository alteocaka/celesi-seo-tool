import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';

export const typeOrmConfig: TypeOrmModule = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  type: 'mysql',
  database: 'test_db_69',
  logging: true,
  port: process.env.PORT,
  entities: [UserEntity],
  synchronize: true,
};
