import { Field, ID, InputType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

export type ExcludeMethods<T> = {
  [K in keyof T as T[K] extends () => void ? never : K]: T[K];
};

/**
 * Class validator is used to validate the input data.
 * Note: GraphQL natively checks whether the fields have correct types (String, Int, Float, Boolean, etc.) so we don't have to use the `@IsOptional`, `@Allow`, `@IsString` or the `@IsInt` decorators at all!
 */

@InputType()
export class IdInput {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number;
}
