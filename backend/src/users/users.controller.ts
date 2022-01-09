import {
  Controller,
  Get,
  UseGuards,
  Request,
  // Post,
  // Response,
  Delete,
  Param,
  RequestMapping,
} from '@nestjs/common';
import {
  Crud,
  // CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud/';
import { WithRole } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
// import { CreateUserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './users.service';
import { UserRole } from '../users/user.interface';
import { Response } from '@nestjs/common';
// import { Parser } from 'json2csv';

@Crud({
  model: {
    type: UserEntity,
  },
  // Dtos
  query: {
    join: {
      role: {},
      days: {},
    },
    exclude: ['password'],
  },
})
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }

  // User route to retrieve his own information
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getUserInfo(@Request() req) {
    const user = req.user;
    return user;
  }

  // Get one user information (only ADMIN can perform)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @WithRole(UserRole.ADMIN)
  @Override('getOneBase')
  getOneAndDoStuff(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  // Get all users information (only ADMIN can perform)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @WithRole(UserRole.ADMIN)
  @Override()
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }

  // Create a new user (only ADMIN can perform)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @WithRole(UserRole.ADMIN)
  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UserEntity) {
    return this.base.createOneBase(req, dto);
  }

  // Delete a new user (only SUPERADMIN can perform)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @WithRole(UserRole.ADMIN)
  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }

  // Soft delete a user
  @UseGuards(JwtAuthGuard)
  @Delete('/soft-delete/:userId')
  softDeleteOne(@Param('userId') id: number) {
    console.log(id);
    return this.service.softDeleteUser(id).then((result) => {
      return result;
    });
  }
}
