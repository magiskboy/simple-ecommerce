import { BeforeInsert, Column, Entity } from 'typeorm';
import slugify from 'slugify';
import { BaseModel } from 'platform/database';

@Entity({ name: 'brands' })
export default class Brand extends BaseModel {
  @Column('varchar', { unique: true, nullable: false })
  name: string;

  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('varchar', { nullable: true })
  photoURL?: string;

  @BeforeInsert()
  setCode() {
    this.code = slugify(this.name, { lower: true, trim: true });
  }
}
