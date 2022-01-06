import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { UrlEntity } from './url.entity';
import { UrlRepository } from './url.repository';
import { UrlService } from './url.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, UrlRepository])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
