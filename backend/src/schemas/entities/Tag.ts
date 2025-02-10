import { GraphQLDateTime } from 'graphql-scalars';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Ad } from '@/schemas/entities/Ad';
import { User } from '@/schemas/entities/User';

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
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: 'text' })
  @Field(() => String)
  name!: string;

  /**
   * Special column that is automatically set to the entity's insertion time.
   * You don't need to write a value into this column - it will be automatically set.
   */
  @CreateDateColumn()
  @Field(() => GraphQLDateTime)
  createdAt!: Date;

  /**
   * Special column that is automatically set to the entity's update time each time you call save from entity manager or repository.
   * You don't need to write a value into this column - it will be automatically set.
   */
  @UpdateDateColumn()
  @Field(() => GraphQLDateTime)
  updatedAt!: Date;

  /**
   * Special column that is automatically set to the entity's delete time each time you call save from entity manager or repository.
   * You don't need to write a value into this column - it will be automatically set.
   */
  @DeleteDateColumn()
  @Field(() => GraphQLDateTime, { nullable: true })
  deletedAt!: Date;

  /** Many-to-Many relation options (join table)
   *
   * The option { onDelete: 'CASCADE' } will automatically delete the relation between an ad and a tag when deleting an ad.
   * Placing the option on this side of the relation will also make it possible to delete a tag without having to delete all the relations between the tag and the ads.
   *
   */
  @ManyToMany(() => Ad, (ad) => ad.tags, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Ad])
  ads!: Ad[];

  /** Keep track of which user created a tag
   *
   * No mapping needed on the other side (User entity, no need to know which tags a user created when requesting users).
   *
   * Many-to-One relation options:
   *  - { eager: true } will automatically fetch the related user (who created the tag) when  fetching a tag, without having to explicitly set the option { relations: ['createdBy'] } when calling Tag.find(), Tag.findBy() or findOneBy(). Here the eager option is commented since we now use makeRelations() to fetch the related category.
   *
   *  - { nullable: false } will make sure that a user must be provided when creating a tag.
   */
  // !TODO: remove {nullable: true} when the dump file will be updated with a user for every category ...
  @ManyToOne(
    () => User,
    // { eager: true }
  )
  @Field(() => User, { nullable: true })
  createdBy!: User;
}
