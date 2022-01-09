import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';

export class TypeOrmConfigClass {
  constructor(private configService: ConfigService) {}

  typeOrmConfig: TypeOrmModule = {
    username: this.configService.get('DB_USERNAME'),
    password: this.configService.get('DB_PASSWORD'),
    host: this.configService.get('DB_HOST'),
    port: this.configService.get('DB_PORT'),
    database: this.configService.get('DB_NAME'),
    synchronize: this.configService.get('DB_SYNC'),
    type: this.configService.get('DB_TYPE'),
    entities: [UserEntity],
  };
}
