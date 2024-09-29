import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Ad } from './Ad.ts';

/** Active record pattern
 * ----------------------
 * Inheriting from BaseEntity sets Active Record pattern (vs Data Mapper).
 * This approach allows to access the database within the models.
 * It gives access to some useful methods like save, remove, etc.
 */
@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', length: 50 })
  name!: string;

  /** Many-to-Many relation options
   * ----------------------
   * The option { onDelete: 'CASCADE' } will automatically delete the relation between an ad and a tag when deleting an ad.
   * Placing the option on this side of the relation will also make it possible to delete a tag without having to delete all the relations between the tag and the ads.
   */
  @ManyToMany(() => Ad, (ad) => ad.tags, {
    onDelete: 'CASCADE',
  })
  ads!: Ad[];
}
