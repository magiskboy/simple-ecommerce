import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseModel } from 'platform/database';

export type PasswordType = 'plain' | 'hash';

export type UserRole = 'Admin' | 'Employee' | 'Normal';

@Entity({ name: 'users' })
export default class User extends BaseModel {
  @Column({ type: 'uuid', nullable: false, unique: true })
  uuid: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', default: 'hash', nullable: false })
  passwordType: PasswordType;

  @Column({ type: 'simple-array', nullable: false })
  roles: UserRole[];

  @Column({ type: 'varchar', nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', nullable: true })
  photoURL?: string;

  @BeforeInsert()
  setUUID() {
    this.uuid = uuidv4();
  }
}
