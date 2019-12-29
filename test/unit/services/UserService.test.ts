import { LogMock } from '../lib/LogMock'
import { RepositoryMock } from '../lib/RepositoryMock'
import { User } from '../../../src/api/models/User'
import { UserService } from '../../../src/api/services/UserService'

describe('UserService', () => {
  test('Find should return a list of users', async () => {
    const log = new LogMock()
    const repo = new RepositoryMock()
    const user = new User()
    user.firstName = 'Bruce'
    user.lastName = 'Banner'
    user.email = 'bruce.banner@marvel.com'
    repo.list = [user]
    const userService = new UserService(repo as any, log)
    const list = await userService.find()

    expect(list[0].firstName).toBe(user.firstName)
  })
})
