import { Service } from 'typedi'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { PetRepository } from '../repositories/PetRepository'
import { Logger, LoggerInterface } from '../../decorators/Logger'
import { Pet } from '../models/Pet'
import { User } from '../models/User'

@Service()
export class PetService {
  constructor(
    @OrmRepository() private petRepository: PetRepository,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public find(): Promise<Pet[]> {
    this.log.info('Find all pets')
    return this.petRepository.find()
  }

  public findOne(id: string): Promise<Pet> {
    return this.petRepository.findOne({ id })
  }

  public findByUser(user: User): Promise<Pet[]> {
    return this.petRepository.find({ where: { userId: user.id } })
  }

  public create(pet: Pet): Promise<Pet> {
    return this.petRepository.save(pet)
  }

  public update(id: string, pet: Pet): Promise<Pet> {
    pet.id = id
    return this.petRepository.save(pet)
  }

  public async delete(id: string): Promise<void> {
    await this.petRepository.delete(id)
    return
  }
}
