import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @HideField()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  surname: string;

  @HideField()
  @Column({ type: 'int', nullable: true })
  resetCode: number | null;

  @HideField()
  @Column({ type: 'timestamp', nullable: true })
  resetCodeExpiry: Date | null;

  @Field()
  @Column({ type: 'boolean', default: false })
  isBanned: boolean;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;
}
