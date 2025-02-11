import { IsNotEmpty, Length } from 'class-validator'
import { ArgsType, Field, ID, InputType } from 'type-graphql'

/* 
  -------------------------------------------------------------------------- 
  "WRITE" CLASSES (query and mutation arguments)                             
  JS class =>                                                                
    > interface TS                                                          
    > GraphQL API schema (typegraphql + class-validator)                    
  -------------------------------------------------------------------------- 
  Class validator is used to validate the input data
 
  Note: GraphQL natively checks whether the fields have correct types (String, Int, Float, Boolean, etc.) so we don't have to use the `@IsOptional`, `@Allow`, `@IsString` or the `@IsInt` decorators at all!
*/
@ArgsType()
export class GetTagsArgs {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  name?: string
}

@ArgsType()
export class GetTagArgs {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number
}

@InputType({ description: 'New tag data' })
export class AddTagInput {
  @Field(() => String)
  @Length(3, 50, {
    message: 'Tag name must be between 3 and 50 characters long.',
  })
  name!: string
}

// !TODO: validation not working when passing "name": null in the data object...
@InputType({ description: 'Update tag data' })
export class UpdateTagInput {
  @Field(() => String, { nullable: true }) // Marks the field as optional in TypeGraphQL schema.
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'Tag name must be between 3 and 50 characters long.',
  }) // Validation: if provided, it must be a string with a certain length.
  name?: string
}
