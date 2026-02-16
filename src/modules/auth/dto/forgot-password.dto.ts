import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ForgotPasswordDto {
  @Field()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;
}
