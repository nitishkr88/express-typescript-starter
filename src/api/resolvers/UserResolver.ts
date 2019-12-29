import { Service } from 'typedi'
import { Resolver, Query, FieldResolver, Root } from 'type-graphql'

import { User as UserModel } from '../models/User'
import { User } from '../types/User'
import { UserService } from '../services/UserService'
import { PetService } from '../services/PetService'

@Service()
@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private petService: PetService
  ) {}

  @Query(returns => [User])
  public users(): Promise<any> {
    return this.userService.find()
  }

  @FieldResolver()
  public async pets(@Root() user: UserModel): Promise<any> {
    return this.petService.findByUser(user)
  }
}
