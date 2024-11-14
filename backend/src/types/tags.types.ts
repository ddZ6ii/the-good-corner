import { ArgsType, Field, ID, InputType } from 'type-graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { TAG_CONSTRAINTS } from '@tgc/common';
import { Tag } from '@database/entities/Tag.ts';
import { ExcludeMethods } from './utils.types.ts';

export type TagContent = Omit<ExcludeMethods<Tag>, 'id' | 'ads'>;

/**
 * Class validator is used to validate the input data.
 * Note: GraphQL natively checks whether the fields have correct types (String, Int, Float, Boolean, etc.) so we don't have to use the `@IsOptional`, `@Allow`, `@IsString` or the `@IsInt` decorators at all!
 */

@ArgsType()
export class GetTagsArgs {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  name?: string;
}

@ArgsType()
export class GetTagArgs {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number;
}

@InputType({ description: 'New tag data' })
export class AddTagInput implements TagContent {
  @Field(() => String)
  @Length(TAG_CONSTRAINTS.name.minLength, TAG_CONSTRAINTS.name.maxLength)
  name!: string;
}

// !TODO: validation not working when passing "name": null in the data object...
@InputType({ description: 'Update tag data' })
export class UpdateTagInput implements Partial<TagContent> {
  @Field(() => String, { nullable: true }) // Marks the field as optional in TypeGraphQL schema.
  @IsNotEmpty()
  @Length(TAG_CONSTRAINTS.name.minLength, TAG_CONSTRAINTS.name.maxLength) // Validation: if provided, it must be a string with a certain length.
  name?: string;
}
