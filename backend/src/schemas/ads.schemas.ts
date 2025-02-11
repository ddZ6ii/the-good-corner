import {
  IsNotEmpty,
  IsPositive,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator'
import { ArgsType, Field, ID, InputType, Int } from 'type-graphql'
import { IdInput } from '@/schemas'

/* -------------------------------------------------------------------------- */
/* "WRITE" CLASSES (query and mutation arguments)                             */
/* JS class =>                                                                */
/*    > interface TS                                                          */
/*    > GraphQL API schema (typegraphql + class-validator)                    */
/* -------------------------------------------------------------------------- */
/** Class validator is used to validate the input data
 *
 * Note: GraphQL natively checks whether the fields have correct types (String, Int, Float, Boolean, etc.) so we don't have to use the `@IsOptional`, `@Allow`, `@IsString` or the `@IsInt` decorators at all!
 *
 */
@ArgsType()
export class GetAdsArgs {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  categoryName?: string
}

@ArgsType()
export class GetAdArgs {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number
}

@InputType({ description: 'New ad data' })
export class AddAdInput {
  @Field(() => String)
  @Length(5, 50)
  title!: string

  @Field(() => String)
  @Length(5, 500)
  description!: string

  @Field(() => Int)
  @IsPositive()
  price!: number

  @Field(() => String)
  @IsUrl()
  picture!: string

  @Field(() => String)
  @Length(3, 50)
  location!: string

  @Field(() => IdInput)
  @ValidateNested() // Perform nested validation on nested arrays or objects.
  category!: IdInput

  // Nullable field so we can create an ad without tags by either not passing the `tags` property, or either passing "tag" = null or "tags" = [].
  @Field(() => [IdInput], { nullable: true })
  @ValidateNested()
  tags?: IdInput[]
}

@InputType({ description: 'Update ad data' })
export class UpdateAdInput {
  @Field(() => String, { nullable: true })
  @Length(5, 50, { message: 'Title must be between 5 and 50 characters' })
  title?: string

  @Field(() => String, { nullable: true })
  @Length(5, 500, {
    message: 'Description must be between 5 and 500 characters',
  })
  description?: string

  @Field(() => Int, { nullable: true })
  @IsPositive({ message: 'Price must be a positive number' })
  price?: number

  @Field(() => String, { nullable: true })
  @IsUrl()
  picture?: string

  @Field(() => String, { nullable: true })
  @Length(3, 50, { message: 'Location must be between 3 and 50 characters' })
  location?: string

  @Field(() => IdInput, { nullable: true })
  @ValidateNested() // Perform nested validation on nested arrays or objects.
  category?: IdInput

  @Field(() => [IdInput], { nullable: true })
  @ValidateNested()
  tags?: IdInput[]
}
