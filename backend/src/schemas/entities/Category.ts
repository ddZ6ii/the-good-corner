import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
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
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: 'text' })
  @Field(() => String)
  name!: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  // A category can have many ads.
  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads!: Ad[];

  /** Keep track of which user created a category
   *
   * No mapping needed on the other side (User entity, no need to know which categories a user created when requesting users).
   *
   * Many-to-One relation options:
   *  - { eager: true } will automatically fetch the related user (who created the category) when  fetching a category, without having to explicitly set the option { relations: ['createdBy'] } when calling Category.find(), Category.findBy() or findOneBy().
   *  - { nullable: false } will make sure that a category must be provided when creating an ad.
   *
   */
  // !TODO: remove {nullable: true} when the dump file will be updated with a user for every category ...
  @ManyToOne(() => User, { eager: true })
  @Field(() => User, { nullable: true })
  createdBy!: User;
}
