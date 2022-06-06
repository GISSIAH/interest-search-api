import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('specific/:id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  public createUser(@Req() req: Request): Promise<User> {
    return this.userService.createUser(req.body);
  }

  @Get('all')
  public getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
}
