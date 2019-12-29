import { Repository, EntityRepository } from 'typeorm'

import { Pet } from '../models/Pet'

@EntityRepository(Pet)
export class PetRepository extends Repository<Pet> {

  public findByUserIds(ids: string[]): Promise<Pet[]> {
    return this.createQueryBuilder()
      .select()
      .where(`pet.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
      .getMany()
  }

}
