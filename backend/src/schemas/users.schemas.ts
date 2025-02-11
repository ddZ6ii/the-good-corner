import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator'
import { ArgsType, Field, ID, InputType } from 'type-graphql'

const PASSWORD_RESTRICTIONS = {
  minLength: 12,
  maxLength: 40,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
}

const PASSWORD_OPTIONS = {
  minLength: PASSWORD_RESTRICTIONS.minLength,
  minLowercase: PASSWORD_RESTRICTIONS.minLowercase,
  minUppercase: PASSWORD_RESTRICTIONS.minUppercase,
  minNumbers: PASSWORD_RESTRICTIONS.minNumbers,
  minSymbols: PASSWORD_RESTRICTIONS.minSymbols,
}

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
export class GetUsersArgs {
  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string
}

@ArgsType()
export class GetUserArgs {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number
}

@InputType({ description: 'New user data' })
export class CreateUserInput {
  @Field(() => String)
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string

  @Field(() => String)
  @MaxLength(PASSWORD_RESTRICTIONS.maxLength, {
    message: `Password must be less than ${PASSWORD_RESTRICTIONS.maxLength.toString()} characters long`,
  })
  @IsStrongPassword(PASSWORD_OPTIONS, {
    message: `Please make sure your password meet the strength requirements: between ${PASSWORD_RESTRICTIONS.minLength.toString()} and ${PASSWORD_RESTRICTIONS.maxLength.toString()} long, including at least ${PASSWORD_RESTRICTIONS.minLowercase.toString()} lowercase letter, ${PASSWORD_RESTRICTIONS.minUppercase.toString()} uppercase letter, ${PASSWORD_RESTRICTIONS.minNumbers.toString()} number, and ${PASSWORD_RESTRICTIONS.minSymbols.toString()} symbol.`,
  })
  password!: string
}

@InputType({ description: 'User login credentials' })
export class LogInInput {
  @Field(() => String)
  @IsEmail()
  email!: string

  @Field(() => String)
  @IsNotEmpty()
  password!: string
}
