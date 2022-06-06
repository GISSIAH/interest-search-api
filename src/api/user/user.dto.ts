import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public interests: string;

  @IsNotEmpty()
  public lat: string;

  @IsNotEmpty()
  public lon: string;
}
