import { Application } from 'express'
import { Server } from 'http'
import { Connection } from 'typeorm'
import { bootstrapMicroframework } from 'microframework-w3tec'

import { winstonLoader } from '../../../src/loaders/winstonLoader'
import { diLoader } from '../../../src/loaders/diLoader'
import { expressLoader } from '../../../src/loaders/expressLoader'
import { homeLoader } from '../../../src/loaders/homeLoader'
import { typeormLoader } from './typeormLoader'

export interface BootstrapSettings {
  app: Application
  server: Server
  connection: Connection
}

export const bootstrapApp = async (): Promise<BootstrapSettings> => {
  const framework = await bootstrapMicroframework({
    loaders: [winstonLoader, diLoader, typeormLoader, expressLoader, homeLoader]
  })

  return {
    app: framework.settings.getData('express_app') as Application,
    server: framework.settings.getData('express_server') as Server,
    connection: framework.settings.getData('connection') as Connection
  }
}
