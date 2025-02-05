import { GraphQLDateTime } from 'graphql-scalars';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  //!TODO: this field should be nullable because only admins + self user may see this, null otherwise (see using a custom middleware)...
  @Column({ type: 'text', unique: true })
  @Field(() => String)
  email!: string;

  @Column({ type: 'text' })
  hashedPassword!: string;

  // @Column({ enum: ['user', 'admin'], default: 'user' })
  // @Field(() => String)
  // role!: string; // "user" | "admin"

  @CreateDateColumn()
  @Field(() => GraphQLDateTime)
  createdAt!: string;

  //  May be needed if user can create other users...
  // @ManyToOne(() => User)
  // @Field(() => User)
  // createdBy!: User;
}
