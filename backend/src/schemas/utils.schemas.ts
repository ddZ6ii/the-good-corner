import { IsNotEmpty } from 'class-validator'
import { Field, ID, InputType } from 'type-graphql'

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
@InputType()
export class IdInput {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number
}
