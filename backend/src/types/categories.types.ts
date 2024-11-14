import { ArgsType, Field, ID, InputType } from 'type-graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { CATEGORY_CONSTRAINTS } from '@tgc/common';
import { Category } from '@database/entities/Category.ts';
import { ExcludeMethods } from './utils.types.ts';

export type CategoryContent = Omit<ExcludeMethods<Category>, 'id' | 'ads'>;

/**
 * Class validator is used to validate the input data.
 * Note: GraphQL natively checks whether the fields have correct types (String, Int, Float, Boolean, etc.) so we don't have to use the `@IsOptional`, `@Allow`, `@IsString` or the `@IsInt` decorators at all!
 */

@ArgsType()
export class GetCategoriesArgs {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  name?: string;
}

@ArgsType()
export class GetCategoryArgs {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number;
}

@InputType({ description: 'New category data' })
export class AddCategoryInput implements CategoryContent {
  @Field(() => String)
  @Length(
    CATEGORY_CONSTRAINTS.name.minLength,
    CATEGORY_CONSTRAINTS.name.maxLength,
  )
  name!: string;
}

// !TODO: validation not working when passing "name": null in the data object...
@InputType({ description: 'Update category data' })
export class UpdateCategoryInput implements Partial<CategoryContent> {
  @Field(() => String, { nullable: true }) // Marks the field as optional in TypeGraphQL schema.
  @Length(
    CATEGORY_CONSTRAINTS.name.minLength,
    CATEGORY_CONSTRAINTS.name.maxLength,
  ) // Validation: if provided, it must be a string with a certain length.
  name?: string;
}
