import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './Category.ts';

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

  @Column({ type: 'text', length: 100 })
  location!: string;

  @CreateDateColumn({ type: 'date' })
  createdAt!: Date;

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
}
