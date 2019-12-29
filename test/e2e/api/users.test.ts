import nock from 'nock'
import request from 'supertest'
import { runSeeder } from 'typeorm-seeding'

import { User } from '../../../src/api/models/User'
import { BootstrapSettings } from '../utils/bootstrap'
import { prepareServer } from '../utils/server'
import { CreateBruce } from '../../../src/database/seeds/CreateBruce'
import { closeDatabase } from '../../utils/database'

describe('/api/users', () => {
  let bruce: User
  let settings: BootstrapSettings

  beforeAll(async () => {
    settings = await prepareServer({ migtate: true })
    bruce = ((await runSeeder(CreateBruce)) as unknown) as User
  })

  afterAll(async () => {
    nock.cleanAll()
    await closeDatabase(settings.connection)
  })

  test('GET: / should return a list of users', async () => {
    const response = await request(settings.app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.length).toBe(1)
  })

  test('GET: /:id should return bruce', async () => {
    const response = await request(settings.app)
      .get(`/api/users/${bruce.id}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBe(bruce.id)
    expect(response.body.firstName).toBe(bruce.firstName)
    expect(response.body.lastName).toBe(bruce.lastName)
    expect(response.body.email).toBe(bruce.email)
  })
})
