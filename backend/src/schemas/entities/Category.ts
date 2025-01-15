import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Ad } from '@/schemas/entities/Ad';

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

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads!: Ad[];
}
