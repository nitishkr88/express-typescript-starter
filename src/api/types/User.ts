import { ObjectType, Field, ID } from 'type-graphql'
import { Pet } from './Pet'

@ObjectType()
export class User {
  @Field(type => ID)
  public id: string

  @Field()
  public firstName: string

  @Field()
  public lastName: string

  @Field()
  public email: string

  @Field(type => [Pet])
  public pets: Pet[]
}
