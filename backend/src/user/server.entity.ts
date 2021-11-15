import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Server {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  desc: string;
}
