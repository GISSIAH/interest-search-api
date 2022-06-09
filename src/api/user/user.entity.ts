import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 30 })
  public username: string;

  @Column('text', { array: true })
  public interests: string[];

  @Column({ type: 'real' })
  public lat: string;

  @Column({ type: 'real' })
  public lon: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
}
