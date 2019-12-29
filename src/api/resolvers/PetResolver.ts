import { Service } from 'typedi'
import DataLoader from 'dataloader'
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
  Ctx
} from 'type-graphql'

import { Pet as PetModel } from '../models/Pet'
import { User as UserModel } from '../models/User'
import { Pet } from '../types/Pet'
import { PetService } from '../services/PetService'
import { Logger, LoggerInterface } from '../../decorators/Logger'
import { PetInput } from '../types/input/PetInput'
import { Context } from '../Context'
import { DLoader } from '../../decorators/DLoader'

@Service()
@Resolver(of => Pet)
export class PetResolver {
  constructor(
    // private userService: UserService,
    private petService: PetService,
    @Logger(__filename) private log: LoggerInterface,
    @DLoader(UserModel) private userLoader: DataLoader<string, UserModel>
  ) {}

  @Query(returns => [Pet])
  public pets(@Ctx() { requestId }: Context): Promise<PetModel[]> {
    this.log.info(`{${requestId}} Find all pets`)
    return this.petService.find()
  }

  @Mutation(returns => Pet)
  public addPet(@Arg('pet') pet: PetInput): Promise<PetModel> {
    const newPet = new PetModel()
    newPet.name = pet.name
    newPet.age = pet.age
    return this.petService.create(newPet)
  }

  @FieldResolver()
  public async owner(@Root() pet: PetModel): Promise<any> {
    if (pet.userId) {
      return this.userLoader.load(pet.userId)
    }
    // return this.userService.findOne(pet.userId)
  }
}
