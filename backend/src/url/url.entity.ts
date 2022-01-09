import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class UrlEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ nullable: true })
  @IsString()
  name: string;

  @Column({ nullable: true, default: 'Your comment' })
  @IsString()
  meta_title: string;

  @Column({ nullable: true, default: 'Your comment' })
  @IsString()
  meta_description: string;

  @Column({ nullable: true, default: 'Your comment' })
  @IsString()
  keywords: string;
}
