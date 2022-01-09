import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { url } from 'inspector';
import { Url } from 'url';
import { UrlEntity } from './url.entity';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
    constructor(private repo: UrlRepository) {

    }
    // private readonly urls: UrlEntity[] = [];

    async getAllUrls() {
        const urls = await this.repo.find()
        return urls;
    }

    async getOneUrl(id: any) {
        const url = await this.repo.findOne({
            where: {id}
        })
        return url;
    }

    async updateUrl(id, payload: any){
        const url = await this.getOneUrl(id);
        console.log(url);

        url.meta_title = payload.meta_title;
        url.meta_description = payload.meta_description;
        url.keywords = payload.keywords;

        return await this.repo.save(url);
    }
}
