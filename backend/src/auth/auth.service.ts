import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/users/users.service';
import { EntityRepository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { AuthLoginDto } from './dtos/auth-login.dto';

@Injectable()
@EntityRepository(UserEntity)
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user: User = await this.validateUser(authLoginDto);

    const payload = user;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { username, password } = authLoginDto;

    const user = await this.usersService.findByUsername(username);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
