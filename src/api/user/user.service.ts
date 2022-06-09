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

  public getNearbyUsers(
    lat: number,
    lon: number,
    rad: number,
  ): Promise<User[]> {
    return this.repository.query(`
      select username,interests,st_within 
        from (
          select username,
          interests, 
          lat,
          lon, 
          ST_Within(ST_Transform(ST_SetSRID(ST_Point(lon,lat),4326),32736)  ,ST_Buffer(ST_Transform(ST_SetSRID(ST_Point(${lon},${lat}),4326),32736),${rad}, 'quad_segs=8'))
          from "user"
          )
          as withinQuery
      where st_within = true
    `);
  }

  public matchInterests(
    userInterests: Array<string>,
    otherUsers: Array<User>,
  ): Array<{ name: string; count: number }> {
    const matchCounts: Array<{ name: string; count: number }> = [];
    userInterests.forEach((interest) => {
      let interestCount = 0;
      otherUsers.forEach((user) => {
        user.interests.forEach((otherUserInterest) => {
          if (
            interest.toLocaleLowerCase() ===
            otherUserInterest.toLocaleLowerCase()
          ) {
            interestCount += 1;
          }
        });
      });
      matchCounts.push({
        name: interest,
        count: (interestCount -= 1),
      });
    });

    return matchCounts;
  }
}
