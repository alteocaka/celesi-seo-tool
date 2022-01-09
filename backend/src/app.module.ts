import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm/';

// Own Modules:
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// Entities:
import { UserEntity } from './users/user.entity';
import { RolesGuard } from './auth/roles.guard';
import { UrlModule } from './url/url.module';
import { UrlEntity } from './url/url.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: 'root',
      password: 'root',
      database: 'test_db_69',
      entities: [UserEntity, UrlEntity],
      synchronize: true,
      // type: 'mysql',
      // host: 'us-cdbr-east-04.cleardb.com',
      // port: parseInt(process.env.DATABASE_PORT),
      // username: 'b5b3e6f16b6edb',
      // password: '3f5e23cd',
      // database: 'heroku_5457aab394ea4c0',
      // entities: [UserEntity, DayEntity],
      // synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '/configs/dev.env',
    }),
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
