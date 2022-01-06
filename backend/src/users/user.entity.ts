import * as bcrypt from 'bcryptjs';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  // ManyToOne,
  BeforeInsert,
  DeleteDateColumn,
} from 'typeorm';
import { UserRole } from './user.interface';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ unique: true })
  @IsString()
  @MinLength(6)
  username: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
