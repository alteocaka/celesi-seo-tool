import { Injectable } from '@nestjs/common';
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

    async updateMetaTitle(id, payload) {
        const url = await this.getOneUrl(id);

        url.meta_title = payload;
        return await this.repo.save(url);
    }

    async updateMetaDescription(id, payload) {
        const url = await this.getOneUrl(id);

        url.meta_description = payload;
        return await this.repo.save(url);
    }

    async updateKeywords(id, payload) {
        const url = await this.getOneUrl(id);

        url.keywords = payload;
        return await this.repo.save(url);
    }
}
