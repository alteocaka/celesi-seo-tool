import {
  Controller,
  Post,
  UseGuards,
  // Get,
  // Body,
  // Req,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthLoginDto } from './dtos/auth-login.dto';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalGuard } from './local-auth.guard';
// import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    public authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return { access_token: this.jwtService.sign({ userId: req.user.id }) };
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll(@Request() request): any {
  //   return;
  // }
}
