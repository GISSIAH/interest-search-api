import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //learn to use specific route for filter on all parent route
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

  @Get('match')
  public async matchUser(
    @Query() q,
  ): Promise<{ name: string; count: number }[]> {
    const user = await this.getUser(q.id);

    const nearbyUsers = await this.userService.getNearbyUsers(
      Number(user.lat),
      Number(user.lon),
      500,
    );
    return this.userService.matchInterests(user.interests, nearbyUsers);
  }
}
