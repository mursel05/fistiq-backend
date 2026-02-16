import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  success: boolean;

  @Field(() => TokenResponse)
  data: TokenResponse;

  @Field()
  timestamp: string;
}
