import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import slugify from 'slugify';
import { BaseModel } from 'platform/database';

@Entity({ name: 'categories' })
export default class Category extends BaseModel {
  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @Column('varchar', { nullable: false, unique: true })
  slug: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('boolean', { nullable: false, default: true })
  isLeaf: boolean;

  @ManyToOne(() => Category, (category) => category.children, {
    cascade: true,
    nullable: true,
  })
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @BeforeInsert()
  setSlug() {
    this.slug = slugify(this.name, { lower: true, trim: true });
  }
}
