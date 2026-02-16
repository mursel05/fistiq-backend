import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ObjectType()
export class PayloadTokenDto {
  @Field()
  @IsNumber()
  sub: number;
}
