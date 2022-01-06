import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UrlEntity } from './url.entity';
import { UrlService } from './url.service';

@UseGuards(JwtAuthGuard)
@Controller('url')
export class UrlController {
    constructor(private urlService: UrlService) { }

    @Get()
    async getAllUrls(): Promise<UrlEntity[]> {
        return this.urlService.getAllUrls();
    }

    @Get('/get/:id')
    async getOneUrl(): Promise<UrlEntity> {
        return this.urlService.getOneUrl(1);
    }

    @Patch('update-meta-title/:id')
    async updateMetaTitle(id, payload): Promise<UrlEntity> {
        return this.urlService.updateMetaTitle(1, 'Changed Text');
    }

    @Patch('update-meta-description/:id')
    async updateMetaDescription(id, payload): Promise<UrlEntity> {
        return this.urlService.updateMetaDescription(1, 'Changed Text');
    }

    @Patch('update-keywords/:id')
    async updateKeywords(id, payload): Promise<UrlEntity> {
        return this.urlService.updateKeywords(1, 'Changed Text');
    }
}

