import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Ad } from '@/entities/Ad';

/** Active record pattern
 * ----------------------
 * Inheriting from BaseEntity sets Active Record pattern (vs Data Mapper).
 * This approach allows to access the database within the models.
 * It gives access to some useful methods like save, remove, etc.
 */
@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: 'text', length: 50 })
  @Field(() => String)
  name!: string;

  /** Many-to-Many relation options
   * ----------------------
   * The option { onDelete: 'CASCADE' } will automatically delete the relation between an ad and a tag when deleting an ad.
   * Placing the option on this side of the relation will also make it possible to delete a tag without having to delete all the relations between the tag and the ads.
   */
  @ManyToMany(() => Ad, (ad) => ad.tags, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Ad])
  ads!: Ad[];
}
