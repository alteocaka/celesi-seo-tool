import { EntityRepository, Repository } from 'typeorm';
import { Get, Injectable } from '@nestjs/common';
import { UrlEntity } from './url.entity';
import { UrlService } from './url.service';

@Injectable()
@EntityRepository(UrlEntity)
export class UrlRepository extends Repository<UrlEntity> {

}
