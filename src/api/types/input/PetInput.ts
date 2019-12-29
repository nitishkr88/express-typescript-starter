import { InputType, Field, Int } from 'type-graphql'

import { Pet } from '../Pet'

@InputType()
export class PetInput implements Partial<Pet> {
  @Field()
  public name: string

  @Field(type => Int)
  public age: number
}
