import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Emoticon {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}
