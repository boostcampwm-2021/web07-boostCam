import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  githubId: number;

  @Column()
  nickname: string;

  @Column()
  profile: string;
}
