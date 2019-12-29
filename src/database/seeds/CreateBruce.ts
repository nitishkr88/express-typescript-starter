import { Seeder, Factory } from 'typeorm-seeding'
import { Connection } from 'typeorm'

import { User } from '../../api/models/User'

export class CreateBruce implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const em = connection.createEntityManager()

    const user = new User()
    user.firstName = 'Bruce'
    user.lastName = 'Wayne'
    user.email = 'bruce.wayne@wayne-enterprises.com'
    user.username = 'bruce'
    user.password = '1234'
    return await em.save(user)
  }
}
