import 'reflect-metadata'

import { bootstrapMicroframework } from 'microframework-w3tec'

import { banner } from './lib/banner'
import { Logger } from './lib/logger'
import { winstonLoader } from './loaders/winstonLoader'
import { diLoader } from './loaders/diLoader'
import { typeormLoader } from './loaders/typeormLoader'
import { expressLoader } from './loaders/expressLoader'
import { homeLoader } from './loaders/homeLoader'
import { publicLoader } from './loaders/publicLoader'
import { graphqlLoader } from './loaders/graphqlLoader'

const log = new Logger(__filename)

bootstrapMicroframework({
  loaders: [
    winstonLoader,
    diLoader,
    typeormLoader,
    expressLoader,
    homeLoader,
    publicLoader,
    graphqlLoader
  ]
})
  .then(() => banner(log))
  .catch(error => log.error('Application crashed: ' + error))
