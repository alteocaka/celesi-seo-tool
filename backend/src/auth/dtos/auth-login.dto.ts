import { IsNumber, IsString } from 'class-validator';
import { UserRole } from 'src/users/user.interface';

export class AuthLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
