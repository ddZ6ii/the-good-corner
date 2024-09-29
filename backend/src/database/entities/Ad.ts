import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { Category } from './Category.ts';
import { Tag } from './Tag.ts';

/** Active record pattern
 * ----------------------
 * Inheriting from BaseEntity sets Active Record pattern (vs Data Mapper).
 * This approach allows to access the database within the models.
 * It gives access to some useful methods like save, remove, etc.
 */
@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', length: 50 })
  title!: string;

  @Column({ type: 'text', length: 500 })
  description!: string;

  @Column({ type: 'text' })
  owner!: string;

  @Column({ type: 'float', unsigned: true })
  price!: number;

  @Column({ type: 'text' })
  picture!: string;

  @Column({ type: 'text', length: 50 })
  location!: string;

  @Column({ type: 'text' })
  createdAt!: string;

  // The updateDates() method is called before creating a new ad.
  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date().toISOString();
  }

  /** Relation options
   * ----------------------
   * The option { eager: true } will automatically fetch the related category when fetching an ad, without having to explicitly set the option { relations: ['category'] } when calling Ad.find() or Ad.findBy().
   *
   * The option { nullable: false } will make sure that a category must be provided when creating an ad.
   */
  @ManyToOne(() => Category, (category) => category.ads, {
    eager: true,
    nullable: false,
  })
  category!: Category;

  /** Join table
   * ----------------------
   * JoinTable() is required for ManyToMany relations.
   * JoinTable must be placed on one (owning) side only of the relation.
   */
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags!: Tag[];
}
