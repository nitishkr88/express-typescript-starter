import Faker from 'faker'
import { define } from 'typeorm-seeding'

import { Pet } from '../../api/models/Pet'

define(Pet, (faker: typeof Faker) => {
  const gender = faker.random.number(1)
  const name = faker.name.firstName(gender)

  const pet = new Pet()
  pet.name = name
  pet.age = faker.random.number()
  return pet
})
