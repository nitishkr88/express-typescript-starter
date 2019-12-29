import { Service } from 'typedi'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { UserRepository } from '../repositories/UserRepository'
import { LoggerInterface } from '../../lib/logger'
import { Logger } from '../../decorators/Logger'
import { User } from '../models/User'

@Service()
export class UserService {
  constructor(
    @OrmRepository() private userRepository: UserRepository,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public find(): Promise<User[]> {
    this.log.info('Find all users')
    return this.userRepository.find({ relations: ['pets'] })
  }

  public findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ id })
  }

  public create(user: User): Promise<User> {
    return this.userRepository.save(user)
  }

  public update(id: string, user: User): Promise<User> {
    user.id = id
    return this.userRepository.save(user)
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id)
    return
  }
}
