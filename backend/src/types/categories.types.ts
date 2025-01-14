import { ArgsType, Field, ID, InputType } from 'type-graphql';
import { IsNotEmpty, Length } from 'class-validator';

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
export class AddCategoryInput {
  @Field(() => String)
  @Length(3, 50, {
    message: 'Category name must be between 3 and 50 characters long.',
  })
  name!: string;
}

// !TODO: validation not working when passing "name": null in the data object...
@InputType({ description: 'Update category data' })
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true }) // Marks the field as optional in TypeGraphQL schema.
  @Length(3, 50, {
    message: 'Category name must be between 3 and 50 characters long.',
  }) // Validation: if provided, it must be a string with a certain length.
  name?: string;
}
