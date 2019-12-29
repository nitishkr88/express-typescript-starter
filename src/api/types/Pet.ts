import { ObjectType, Field, ID, Int } from 'type-graphql'

import { User } from './User'

@ObjectType()
export class Pet {
  @Field(type => ID)
  public id: string

  @Field()
  public name: string

  @Field(type => Int)
  public age: number

  @Field(type => User, { nullable: true })
  public owner: User
}
