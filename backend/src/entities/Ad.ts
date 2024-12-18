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
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { GraphQLDateTime } from 'graphql-scalars';
import { Category } from '@/entities/Category';
import { Tag } from '@/entities/Tag';

/** Active record pattern
 * ----------------------
 * Inheriting from BaseEntity sets Active Record pattern (vs Data Mapper).
 * This approach allows to access the database within the models.
 * It gives access to some useful methods like save, remove, etc.
 */
@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: 'text' })
  @Field(() => String)
  title!: string;

  @Column({ type: 'text' })
  @Field(() => String)
  description!: string;

  @Column({ type: 'text' })
  @Field(() => String)
  owner!: string;

  // Price is in cents to avoid floating point arithmetic issues.
  @Column({ type: 'integer', unsigned: true })
  @Field(() => Int)
  price!: number;

  @Column({ type: 'text' })
  @Field(() => String)
  picture!: string;

  @Column({ type: 'text' })
  @Field(() => String)
  location!: string;

  @Column({ type: 'text' })
  @Field(() => GraphQLDateTime)
  createdAt!: string;

  // The updateDates() method is called before creating a new ad.
  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date().toISOString();
  }

  /** Relation options
   * ----------------------
   * The option { eager: true } will automatically fetch the related category when fetching an ad, without having to explicitly set the option { relations: ['category'] } when calling Ad.find(), Ad.findBy() or findOneBy().
   * The option { nullable: false } will make sure that a category must be provided when creating an ad.
   */
  @ManyToOne(() => Category, (category) => category.ads, {
    eager: true,
    nullable: false,
  })
  @Field(() => Category)
  category!: Category;

  /** Join table
   * ----------------------
   * JoinTable() is required for ManyToMany relations.
   * JoinTable must be placed on one (owning) side only of the relation.
   */
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag], { nullable: true })
  tags!: Tag[];
}
