import { ArgsType, Field, ID, InputType } from 'type-graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

const PASSWORD_RESTRICTIONS = {
  minLength: 12,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const PASSWORD_OPTIONS = {
  minLength: PASSWORD_RESTRICTIONS.minLength,
  minLowercase: PASSWORD_RESTRICTIONS.minLowercase,
  minUppercase: PASSWORD_RESTRICTIONS.minUppercase,
  minNumbers: PASSWORD_RESTRICTIONS.minNumbers,
  minSymbols: PASSWORD_RESTRICTIONS.minSymbols,
};

/**
 * Class validator is used to validate the input data.
 * Note: GraphQL natively checks whether the fields have correct types (String, Int, Float, Boolean, etc.) so we don't have to use the `@IsOptional`, `@Allow`, `@IsString` or the `@IsInt` decorators at all!
 */

@ArgsType()
export class GetUsersArgs {
  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;
}

@ArgsType()
export class GetUserArgs {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number;
}

@InputType({ description: 'New user data' })
export class AddUserInput {
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @IsStrongPassword(PASSWORD_OPTIONS, {
    message: `Password is too weak. Make sure it has a minimum of ${PASSWORD_RESTRICTIONS.minLength} characters, including at least ${PASSWORD_RESTRICTIONS.minLowercase} lowercase letter(s), ${PASSWORD_RESTRICTIONS.minUppercase} uppercase letter(s), ${PASSWORD_RESTRICTIONS.minNumbers} number(s), and ${PASSWORD_RESTRICTIONS.minSymbols} symbol(s).`,
  })
  password!: string;
}

@InputType({ description: 'User sign in credentials' })
export class SignInInput {
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @IsNotEmpty()
  password!: string;
}
