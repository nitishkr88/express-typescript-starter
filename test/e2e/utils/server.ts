import { setConnection } from 'typeorm-seeding'

import { bootstrapApp } from './bootstrap'
import { migrateDatabase } from '../../utils/database'

export const prepareServer = async (options?: { migtate: boolean }) => {
  const settings = await bootstrapApp()
  if (options && options.migtate) {
    await migrateDatabase(settings.connection)
  }
  setConnection(settings.connection)
  return settings
}
