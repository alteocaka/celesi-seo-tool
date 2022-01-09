import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
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

    @Patch('update/:id')
    async updateUrl( @Param('id') id: number, @Body() payload): Promise<UrlEntity> {
        return this.urlService.updateUrl(id, {meta_title: payload.meta_title, meta_description: payload.meta_description, keywords: payload.keywords});
    }
}

