import { GraphQLDateTime } from 'graphql-scalars'
import {
  Field,
  ID,
  ObjectType,
  registerEnumType,
  UseMiddleware,
} from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsUser } from '@/middlewares/IsUser'
import { UserRole } from '@/types'

/* 
  -------------------------------------------------------------------------- 
  "READ" CLASS                                                               
  JS class =>                                                                
    > interface TS                                                          
    > database schema or "data model" (typeorm)                             
    > GraphQL API schema (typegraphql)                                      
  -------------------------------------------------------------------------- 
  Active record pattern
 
  Inheriting from `BaseEntity` sets Active Record pattern (vs Data Mapper).
  This approach allows to access the database within the models.
  It gives access to some useful methods like save, remove, etc.
*/
@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ type: 'text', unique: true })
  @Field(() => String)
  /*
    Restrict field access via a middleware.
    This field should only be accessible to admins or self user.
  */
  @UseMiddleware(IsUser)
  email!: string

  @Column({ type: 'text' })
  hashedPassword!: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Field(() => UserRole)
  role!: UserRole // "user" | "admin"

  /*
    Special column that is automatically set to the entity's insertion time.
    You don't need to write a value into this column - it will be automatically set.
  */
  @CreateDateColumn()
  @Field(() => GraphQLDateTime)
  createdAt!: string

  /*
    Special column that is automatically set to the entity's update time each time you call save from entity manager or repository.
    You don't need to write a value into this column - it will be automatically set.
  */
  @UpdateDateColumn()
  @Field(() => GraphQLDateTime)
  updatedAt!: Date

  /*
    Special column that is automatically set to the entity's delete time each time you call save from entity manager or repository.
    You don't need to write a value into this column - it will be automatically set.
  */
  @DeleteDateColumn()
  @Field(() => GraphQLDateTime, { nullable: true })
  deletedAt!: Date

  //  May be needed if user can create other users...
  // @ManyToOne(() => User)
  // @Field(() => User)
  // createdBy!: User;
}

/*
  Make TypeGraphQL aware of the enum `UserRole`.
  
  To tell TypeGraphQL about our enum, we would ideally mark the enums with the @EnumType() decorator. However, TypeScript decorators only work with classes, so we need to make TypeGraphQL aware of the enums manually by calling the registerEnumType function and providing the enum name for GraphQ
*/
registerEnumType(UserRole, {
  name: 'UserRole', // Mandatory
  description: 'User possible roles', // Optional
})
