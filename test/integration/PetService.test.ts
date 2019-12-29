import Container from 'typedi'
import { Connection } from 'typeorm'

import { configureLogger } from '../utils/logger'
import {
  createDatabaseConnection,
  migrateDatabase,
  closeDatabase
} from '../utils/database'
import { Pet } from '../../src/api/models/Pet'
import { PetService } from '../../src/api/services/PetService'

describe('PetService', () => {
  let connection: Connection
  beforeAll(async () => {
    configureLogger()
    connection = await createDatabaseConnection()
  })
  beforeEach(() => migrateDatabase(connection))

  afterAll(() => closeDatabase(connection))

  test('should create a new pet in database', async () => {
    const pet = new Pet()
    pet.name = 'test_pet'
    pet.age = 1
    const service = Container.get<PetService>(PetService)
    const resultCreate = await service.create(pet)

    expect(resultCreate.name).toBe(pet.name)
    expect(resultCreate.age).toBe(pet.age)

    const resultFind = await service.findOne(resultCreate.id)
    if (resultFind) {
      expect(resultFind.name).toBe(pet.name)
      expect(resultFind.age).toBe(pet.age)
    } else {
      fail('Could not find pet')
    }
  })
})
