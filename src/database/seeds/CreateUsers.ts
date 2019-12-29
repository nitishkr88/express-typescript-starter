import { Seeder, Factory } from 'typeorm-seeding'
import { Connection } from 'typeorm'

import { User } from '../../api/models/User'

export class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().seedMany(10)
  }
}
