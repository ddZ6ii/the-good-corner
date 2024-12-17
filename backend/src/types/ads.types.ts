import { ArgsType, Field, ID, InputType, Int } from 'type-graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator';
import { AD_CONSTRAINTS, Id } from '@tgc/common';
import { Ad } from '@/entities/Ad.ts';
import { ExcludeMethods, IdInput } from './utils.types.ts';

type AdContentNoRelation = Omit<
  ExcludeMethods<Ad>,
  'id' | 'createdAt' | 'category' | 'tags'
>;

export type AdContent = AdContentNoRelation & {
  category: Id;
} & {
  tags?: Id[];
};

/**
 * Class validator is used to validate the input data.
 * Note: GraphQL natively checks whether the fields have correct types (String, Int, Float, Boolean, etc.) so we don't have to use the `@IsOptional`, `@Allow`, `@IsString` or the `@IsInt` decorators at all!
 */

@ArgsType()
export class GetAdsArgs {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  categoryName?: string;
}

@ArgsType()
export class GetAdArgs {
  @Field(() => ID)
  @IsNotEmpty()
  id!: number;
}

@InputType({ description: 'New ad data' })
export class AddAdInput implements AdContent {
  @Field(() => String)
  @Length(AD_CONSTRAINTS.title.minLength, AD_CONSTRAINTS.title.maxLength)
  title!: string;

  @Field(() => String)
  @Length(
    AD_CONSTRAINTS.description.minLength,
    AD_CONSTRAINTS.description.maxLength,
  )
  description!: string;

  @Field(() => String)
  @IsEmail()
  owner!: string;

  @Field(() => Int)
  @IsPositive()
  price!: number;

  @Field(() => String)
  @IsUrl()
  picture!: string;

  @Field(() => String)
  @Length(AD_CONSTRAINTS.location.minLength, AD_CONSTRAINTS.location.maxLength)
  location!: string;

  @Field(() => IdInput)
  @ValidateNested() // Perform nested validation on nested arrays or objects.
  category!: IdInput;

  // Nullable field so we can create an ad without tags by either not passing the `tags` property, or either passing "tag" = null or "tags" = [].
  @Field(() => [IdInput], { nullable: true })
  @ValidateNested()
  tags?: IdInput[];
}

@InputType({ description: 'Update ad data' })
export class UpdateAdInput implements Partial<AddAdInput> {
  @Field(() => String, { nullable: true })
  @Length(AD_CONSTRAINTS.title.minLength, AD_CONSTRAINTS.title.maxLength)
  title?: string;

  @Field(() => String, { nullable: true })
  @Length(
    AD_CONSTRAINTS.description.minLength,
    AD_CONSTRAINTS.description.maxLength,
  )
  description?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  owner?: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  price?: number;

  @Field(() => String, { nullable: true })
  @IsUrl()
  picture?: string;

  @Field(() => String, { nullable: true })
  @Length(AD_CONSTRAINTS.location.minLength, AD_CONSTRAINTS.location.maxLength)
  location?: string;

  @Field(() => IdInput, { nullable: true })
  @ValidateNested() // Perform nested validation on nested arrays or objects.
  category?: IdInput;

  @Field(() => [IdInput], { nullable: true })
  @ValidateNested()
  tags?: IdInput[];
}
