import { GraphQLDateTime } from 'graphql-scalars'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Category, Tag, User } from '@/schemas/entities'

/* -------------------------------------------------------------------------- */
/* "READ" CLASS                                                               */
/* JS class =>                                                                */
/*    > interface TS                                                          */
/*    > database schema or "data model" (typeorm)                             */
/*    > GraphQL API schema (typegraphql)                                      */
/* -------------------------------------------------------------------------- */
/** Active record pattern
 *
 * Inheriting from `BaseEntity` sets Active Record pattern (vs Data Mapper).
 * This approach allows to access the database within the models.
 * It gives access to some useful methods like save, remove, etc.
 *
 */
@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ type: 'text' })
  @Field(() => String)
  title!: string

  @Column({ type: 'text' })
  @Field(() => String)
  description!: string

  // Price is in cents to avoid floating point arithmetic issues.
  @Column({ type: 'integer', unsigned: true })
  @Field(() => Int)
  price!: number

  @Column({ type: 'text' })
  @Field(() => String)
  picture!: string

  @Column({ type: 'text' })
  @Field(() => String)
  location!: string

  /**
   * Special column that is automatically set to the entity's insertion time.
   * You don't need to write a value into this column - it will be automatically set.
   */
  @CreateDateColumn()
  @Field(() => GraphQLDateTime)
  createdAt!: Date

  /**
   * Special column that is automatically set to the entity's update time each time you call save from entity manager or repository.
   * You don't need to write a value into this column - it will be automatically set.
   */
  @UpdateDateColumn()
  @Field(() => GraphQLDateTime)
  updatedAt!: Date

  /**
   * Special column that is automatically set to the entity's delete time each time you call save from entity manager or repository.
   * You don't need to write a value into this column - it will be automatically set.
   */
  @DeleteDateColumn()
  @Field(() => GraphQLDateTime, { nullable: true })
  deletedAt!: Date

  /** Many-to-One relation options
   *
   * The option { eager: true } will automatically fetch the related category when fetching an ad, without having to explicitly set the option { relations: ['category'] } when calling Ad.find(), Ad.findBy() or findOneBy(). Here the eager option is commented since we now use makeRelations() to fetch the related category.
   *
   * The option { nullable: false } will make sure that a category must be provided when creating an ad.
   *
   */
  @ManyToOne(() => Category, (category) => category.ads, {
    // eager: true,
    nullable: false,
  })
  @Field(() => Category)
  category!: Category

  // !TODO: remove {nullable: true} when the dump file will be updated with a user for every category ...
  //  Here the eager option is commented since we now use makeRelations() to fetch the related category.
  @ManyToOne(
    () => User,
    // { eager: true }
  )
  @Field(() => User, { nullable: true })
  createdBy!: User

  /** Many-to-Many relation options (join table)
   *
   * JoinTable() is required for ManyToMany relations.
   * JoinTable must be placed on one (owning) side only of the relation.
   *
   */
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag], { nullable: true })
  tags!: Tag[]
}
