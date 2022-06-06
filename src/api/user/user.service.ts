import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  public createUser(body: CreateUserDto) {
    const user: User = new User();
    user.username = body.username;
    user.interests = body.interests;
    user.lat = body.lat;
    user.lon = body.lon;

    return this.repository.save(user);
  }

  public getAll(): Promise<User[]> {
    return this.repository.find();
  }
}
